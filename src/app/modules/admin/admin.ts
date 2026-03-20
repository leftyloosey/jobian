import { Component, inject, signal } from '@angular/core';
import { map, Observable, switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import {
  CollectionAdminRow,
  onion,
} from '../../shared/collection-admin-row/collection-admin-row';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  RemoveCollectionMutation,
  UpsertNavHeadingMutation,
} from '../../../graphql/generated';
import { Apollo } from 'apollo-angular';
import { CollectionService } from '../../services/collection-service/collection-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AdminService } from '../../services/admin-service/admin-service';
import {
  CollectionsWithPartial,
  CollectionWithPartial,
} from '../../utils/types/collection-types';
import { NameService } from '../../services/name-service/name-service';
import { GraphqlSpinner } from '../../shared/graphql-spinner/graphql-spinner';
import { CreateCollectionDialog } from '../../shared/create-collection-dialog/create-collection-dialog';
import { cleanAndDash } from '../../utils/functions/dashing-functions';
import { ChangeBlogTitle } from '../../shared/change-blogtitle/change-blogtitle';
import { sortByDate } from '../../utils/functions/sort-posts';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatDialogModule,
    AsyncPipe,
    CollectionAdminRow,
    GraphqlSpinner,
    ChangeBlogTitle,
    MatButton,
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {
  public collection$!: Observable<CollectionsWithPartial>;
  $title!: Observable<Apollo.MutateResult<UpsertNavHeadingMutation>>;

  protected delete$!: Observable<Apollo.MutateResult<RemoveCollectionMutation>>;
  protected loading = signal<boolean>(true);
  protected error: any;

  readonly dialog = inject(MatDialog);

  constructor(
    private collection: CollectionService,
    private admin: AdminService,
    private name: NameService,
    private router: Router,
  ) {
    admin.upsertSubject
      .pipe(
        takeUntilDestroyed(),
        switchMap((collection) =>
          this.collection.upsertCollection(collection.upsertCollection).pipe(
            tap((result) => {
              if (result.loading) this.loading.set(result.loading);
              result;
            }),
          ),
        ),
      )
      .subscribe();

    admin.deleteSubject
      .pipe(
        takeUntilDestroyed(),
        switchMap((collection) =>
          this.collection.deleteCollection(collection.collectionId).pipe(
            tap((result) => {
              if (result.loading) this.loading.set(result.loading);
              result;
            }),
          ),
        ),
      )
      .subscribe();
  }

  ngOnInit() {
    this.collection$ = this.collection.watchCollections().pipe(
      map((data) => {
        this.loading.set(data.loading);
        const collections = sortByDate(data.data?.collectionByUser);
        return collections;
        // return data.data?.collectionByUser;
      }),
    );
  }

  protected upsertCollection(
    id: number,
    title: string,
    urlTitle: string,
    heading: string,
    headerImageString: string,
  ): void {
    this.admin.upsertSubject.next({
      upsertCollection: {
        id,
        authorId: 0, // authorId will be supplied in collection service
        title,
        urlTitle,
        headerImageString,
        heading,
      },
    });
  }

  protected deleteCollection(element: onion): void {
    // protected deleteCollection(collectionId: number): void {
    const collectionId = element?.id;
    if (collectionId)
      this.admin.deleteSubject.next({
        collectionId,
      });
  }

  protected updateCollection<T extends onion>(collection: T): void {
    if (collection) this.openDialog(collection);
  }
  protected shturb<T extends onion>(collection: T): void {
    this.router.navigate(['/admin/collection-edit', collection?.id]);
  }
  // protected updateCollection(collection: CollectionWithPartial): void {
  //   if (collection) this.openDialog(collection);
  // }

  protected openDialog<T extends onion>(collection: T): void {
    // protected openDialog(collection: CollectionWithPartial): void {
    const coll = {
      id: collection?.id ?? 0,
      title: collection?.title ?? '',
      heading: collection?.heading ?? '',
      headerImageString: collection?.headerImageString ?? '',
      postType: false,
    };
    const dialogRef = this.dialog.open(CreateCollectionDialog, {
      data: coll,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const { id, title, heading, headerImageString } = result;

        // format title to be used in url navigation
        const urlTitle = cleanAndDash(title);

        this.upsertCollection(id, title, urlTitle, heading, headerImageString);
      }
    });
  }

  logout() {
    this.name.logout();
  }
}

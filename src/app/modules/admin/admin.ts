import { Component, inject, signal } from '@angular/core';
import { map, Observable, switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CollectionAdminRow } from '../../shared/collection-admin-row/collection-admin-row';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RemoveCollectionMutation } from '../../../graphql/generated';
import { Apollo } from 'apollo-angular';
import { CollectionService } from '../../services/collection-service/collection-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AdminService } from '../../services/admin-service/admin-service';
import {
  CollectionsWithPartial,
  MaybeCollection,
} from '../../utils/types/collection-types';
import { NameService } from '../../services/name-service/name-service';
import { GraphqlSpinner } from '../../shared/graphql-spinner/graphql-spinner';
import { CreateCollectionDialog } from '../../shared/create-collection-dialog/create-collection-dialog';
import { RostService } from '../../services/rost-service/rost-service';
import {
  AllQuery,
  editRetornable,
  editReturnable,
  returnEditQuery,
  returnspEditQuery,
} from '../../utils/functions/editorReturn';
@Component({
  selector: 'app-admin',
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatDialogModule,
    AsyncPipe,
    CollectionAdminRow,
    GraphqlSpinner,
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {
  public collection$!: Observable<CollectionsWithPartial>;
  public kollection: editRetornable[] = [];
  public kollection$!: Observable<[editRetornable] | undefined | null>;

  jsone$!: Observable<editReturnable | null>;

  protected delete$!: Observable<Apollo.MutateResult<RemoveCollectionMutation>>;
  protected loading = signal<boolean>(true);
  protected error: any;

  readonly dialog = inject(MatDialog);

  constructor(
    private collection: CollectionService,
    private admin: AdminService,
    private name: NameService,
    private gost: RostService,
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
        return data.data?.collectionByUser;
      }),
    );
    this.kollection$ = this.gost.postsInCollection(1).pipe(
      map((stuff) => {
        console.log('poosts', stuff);
        const dato = returnspEditQuery<typeof stuff, AllQuery>(stuff);
        console.log(dato);
        if (dato) this.kollection = dato;
        return dato;
      }),
    );
    this.jsone$ = this.gost.watchOnePost(148).valueChanges.pipe(
      map((post) => {
        const data = returnEditQuery(post);
        this.loading.set(post.loading);
        return data;
      }),
    );
  }

  protected upsertCollection(
    id: number,
    title: string,
    heading: string,
    headerImageString: string,
  ): void {
    this.admin.upsertSubject.next({
      upsertCollection: {
        id,
        authorId: 0, // authorId will be supplied in collection service
        title,
        headerImageString,
        heading,
      },
    });
  }

  protected deleteCollection(collectionId: number): void {
    console.log(collectionId);
    this.admin.deleteSubject.next({
      collectionId,
    });
  }

  protected openDialog(collection: MaybeCollection): void {
    const coll = {
      id: collection?.id ?? 0,
      title: collection?.title ?? '',
      heading: collection?.heading ?? '',
      headerImageString: collection?.headerImageString ?? '',
    };
    const dialogRef = this.dialog.open(CreateCollectionDialog, {
      data: coll,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const { id, title, heading, headerImageString } = result;

        this.upsertCollection(id, title, heading, headerImageString);
      }
    });
  }

  logout() {
    this.name.logout();
  }
}

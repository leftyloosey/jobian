import { Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CollectionAdminRow } from '../../shared/collection-admin-row/collection-admin-row';
import { CreateCollectionDialog } from '../../shared/create-collection-dialog/create-collection-dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  CreateCollectionInputMutation,
  RemoveCollectionMutation,
} from '../../../graphql/generated';
import { Apollo } from 'apollo-angular';
import { CollectionService } from '../../services/collection-service/collection-service';

@Component({
  selector: 'app-admin',
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatDialogModule,
    AsyncPipe,
    CollectionAdminRow,
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {
  public collection$!: Observable<any>;
  protected submit$!: Observable<
    Apollo.MutateResult<CreateCollectionInputMutation>
  >;
  protected delete$!: Observable<Apollo.MutateResult<RemoveCollectionMutation>>;
  // protected loading = true;
  protected error: any;

  readonly dialog = inject(MatDialog);

  constructor(private collection: CollectionService) {}

  ngOnInit() {
    this.collection$ = this.collection.watchCollections().pipe(
      map((data) => {
        return data.data?.collectionByUser;
      })
    );
  }

  protected createCollection(title: string, heading: string) {
    this.submit$ = this.collection.createCollection(title, heading);
  }

  protected deleteCollection(collectionId: number) {
    this.delete$ = this.collection.deleteCollection(collectionId);
  }

  protected openDialog() {
    const dialogRef = this.dialog.open(CreateCollectionDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const { title, heading } = result;
        this.createCollection(title, heading);
      }
    });
  }
}

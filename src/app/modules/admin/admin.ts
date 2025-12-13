import { Component, inject } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CollectionRow } from '../../shared/collection-row/collection-row';
import { CollectionService } from '../../services/collection-service/collection-service';
import { Collection } from '../../utils/interfaces/NewCollection';
import { CreateCollectionDialog } from '../../shared/create-collection-dialog/create-collection-dialog';
import { MatButtonModule } from '@angular/material/button';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-admin',
  imports: [AsyncPipe, CollectionRow, MatButtonModule, MatDialogModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {
  public collection$!: Observable<Collection[]>;
  protected submit$!: Observable<any>;

  protected loading = true;
  protected error: any;

  readonly dialog = inject(MatDialog);

  constructor(private collection: CollectionService) {}

  openDialog() {
    const dialogRef = this.dialog.open(CreateCollectionDialog);

    dialogRef.afterClosed().subscribe((result) => {
      const { title, heading } = result;
    });
  }

  ngOnInit() {
    this.collection$ = this.collection
      .getCollections(this.loading, this.error)
      .valueChanges.pipe(
        map((result: any) => {
          const collections = result?.data?.collectionsWithPosts;

          this.loading = result.loading;
          this.error = result.error;
          return collections;
        })
      );
  }
  protected async createCollection() {
    this.submit$ = this.collection
      .newCollection('sample_title1', 'sample-heading', 1)
      .pipe(tap((submit) => submit));
  }

  protected async deleteCollection(ministryId: number) {
    this.submit$ = this.collection.deleteCollection(ministryId);
  }
}

import {
  Component,
  input,
  OnChanges,
  OnInit,
  output,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { CollectionWithPartial } from '../../utils/types/collection-types';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Post } from '../../../graphql/generated';
import { posst } from '../../utils/types/post-types';
export type onion = posst | CollectionWithPartial;
@Component({
  selector: 'app-collection-admin-row',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './collection-admin-row.html',
  styleUrl: './collection-admin-row.scss',
})
export class CollectionAdminRow<T extends onion> {
  public downCollection = input.required<T>();

  public idUpForDelete = output<T>();
  public collectionUpForOpen = output<T>();
  public collectionUpForEdit = output<T>();

  constructor(private router: Router) {}

  protected openCollection(): void {
    this.collectionUpForEdit.emit(this.downCollection());
  }
  protected updateCollection(): void {
    this.collectionUpForOpen.emit(this.downCollection());
  }

  protected deleteCollection(): void {
    const toEmit = this.downCollection();
    // const toEmit = this.downCollection()?.id ?? 0;
    this.idUpForDelete.emit(toEmit);
  }
}

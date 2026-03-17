import { Component, input, OnInit, output } from '@angular/core';
import { Router } from '@angular/router';
import { CollectionWithPartial } from '../../utils/types/collection-types';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-collection-admin-row',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './collection-admin-row.html',
  styleUrl: './collection-admin-row.scss',
})
export class CollectionAdminRow implements OnInit {
  public downCollection = input<CollectionWithPartial>();
  protected collection: CollectionWithPartial = {};

  public idUpForDelete = output<number>();
  public collectionUpForOpen = output<CollectionWithPartial>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.collection = this.downCollection();
  }

  protected openCollection(): void {
    this.router.navigate(['/admin/collection-edit', this.collection?.id]);
  }
  protected updateCollection(): void {
    this.collectionUpForOpen.emit(this.collection);
  }

  protected deleteCollection(): void {
    const toEmit = this.collection?.id ?? 0;
    this.idUpForDelete.emit(toEmit);
  }
}

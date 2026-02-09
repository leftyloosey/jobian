import { Component, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { CollectionWithPartial } from '../../utils/types/collection-types';
@Component({
  selector: 'app-collection-admin-row',
  imports: [],
  templateUrl: './collection-admin-row.html',
  styleUrl: './collection-admin-row.scss',
})
export class CollectionAdminRow {
  public collection = input<CollectionWithPartial>();

  public idUpForDelete = output<number>();

  constructor(private router: Router) {}

  protected openCollection(): void {
    this.router.navigate(['/admin/collection-edit', this.collection()?.id]);
  }

  protected deleteCollection(): void {
    const toEmit = this.collection()?.id ?? 0;
    this.idUpForDelete.emit(toEmit);
  }
}

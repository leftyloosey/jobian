import { Component, input, output } from '@angular/core';
import { Collection } from '../../utils/interfaces/NewCollection';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collection-admin-row',
  imports: [],
  templateUrl: './collection-admin-row.html',
  styleUrl: './collection-admin-row.scss',
})
export class CollectionAdminRow {
  public collection = input.required<Collection>();
  public idUpForDelete = output<number>();

  constructor(private router: Router) {}

  protected openCollection(): void {
    this.router.navigate(['/admin/collection-edit', this.collection()?.id]);
  }

  protected deleteCollection(): void {
    this.idUpForDelete.emit(this.collection()?.id);
  }
}

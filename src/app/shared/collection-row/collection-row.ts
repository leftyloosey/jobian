import { AfterContentInit, Component, input, output } from '@angular/core';
import { Collection } from '../../utils/interfaces/NewCollection';

@Component({
  selector: 'app-collection-row',
  imports: [],
  templateUrl: './collection-row.html',
  styleUrl: './collection-row.scss',
})
export class CollectionRow implements AfterContentInit {
  public collection = input.required<Collection>();
  public idUpForDelete = output<number>();

  constructor() {}
  ngAfterContentInit(): void {
    console.log(this.collection());
  }

  protected deleteCollection() {
    this.idUpForDelete.emit(this.collection()?.id);
  }
}

import { AfterContentInit, Component, input, output } from '@angular/core';
import { Ministry } from '../../utils/interfaces/NewMinistry';

@Component({
  selector: 'app-ministry-row',
  imports: [],
  templateUrl: './ministry-row.html',
  styleUrl: './ministry-row.scss',
})
export class MinistryRow implements AfterContentInit {
  public ministry = input.required<Ministry>();
  public idUpForDelete = output<number>();

  constructor() {}
  ngAfterContentInit(): void {
    console.log(this.ministry());
  }

  protected deleteMinistry() {
    this.idUpForDelete.emit(this.ministry()?.id);
  }
}

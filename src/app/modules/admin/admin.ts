import { Component, inject } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MinistryRow } from '../../shared/ministry-row/ministry-row';
import { MinistryService } from '../../services/ministry-service/ministry-service';
import { Ministry } from '../../utils/interfaces/NewMinistry';
import { CreateMinistryDialog } from '../../shared/create-ministry-dialog/create-ministry-dialog';
import { MatButtonModule } from '@angular/material/button';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-admin',
  imports: [AsyncPipe, MinistryRow, MatButtonModule, MatDialogModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {
  protected ministry$!: Observable<Ministry[]>;
  protected submit$!: Observable<any>;

  protected loading = true;
  protected error: any;

  readonly dialog = inject(MatDialog);

  constructor(private ministry: MinistryService) {}

  openDialog() {
    const dialogRef = this.dialog.open(CreateMinistryDialog);

    dialogRef.afterClosed().subscribe((result) => {
      const { title, heading } = result;
    });
  }

  ngOnInit() {
    this.ministry$ = this.ministry
      .getMinistries(this.loading, this.error)
      .valueChanges.pipe(
        map((result: any) => {
          const ministries = result?.data?.ministriesWithPosts;

          this.loading = result.loading;
          this.error = result.error;
          return ministries;
        })
      );
  }
  protected async createMinistry() {
    this.submit$ = this.ministry
      .newMinistry('sample_title1', 'sample-heading', 1)
      .pipe(tap((submit) => submit));
  }

  protected async deleteMinistry(ministryId: number) {
    this.submit$ = this.ministry.deleteMinistry(ministryId);
  }
}

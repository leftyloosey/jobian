import { AsyncPipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CollectionService } from '../../services/collection-service/collection-service';
import { CollectionsWithPartial } from '../../utils/types/collection-types';

@Component({
  selector: 'app-main-collection',
  imports: [AsyncPipe],
  templateUrl: './main-collection.html',
  styleUrl: './main-collection.scss',
})
export class MainCollection implements OnInit {
  protected loading = signal<boolean>(true);
  protected error: any;

  display$!: Observable<CollectionsWithPartial>;

  constructor(
    private router: Router,
    private collection: CollectionService,
  ) {}

  ngOnInit() {
    this.display$ = this.collection.watchCollections().pipe(
      map((data) => {
        this.loading.set(data.loading);
        return data.data?.collectionByUser;
      }),
    );
  }

  openCollection(title: string | undefined): void {
    if (title) this.router.navigate([`${title}`]);
  }
}

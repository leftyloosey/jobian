import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, Observable } from 'rxjs';
// import { CollectionRow } from '../../shared/collection-row/collection-row';
// import { Collection } from '../../utils/interfaces/NewCollection';
import { Collection } from '../../../graphql/generated';
import { CollectionService } from '../../services/collection-service/collection-service';
@Component({
  selector: 'app-main-collection',
  imports: [AsyncPipe],
  templateUrl: './main-collection.html',
  styleUrl: './main-collection.scss',
})
export class MainCollection implements OnInit {
  private route = inject(ActivatedRoute);
  current = this.route.snapshot.routeConfig?.path;

  protected display$!: Observable<Collection[]>;

  constructor(private router: Router, private collection: CollectionService) {}

  ngOnInit() {
    this.display$ = this.collection.watchCollections().pipe(
      map((data) => {
        return data.data?.collectionByUser as Collection[];
      })
    );
  }

  openCollection(title: string) {
    this.router.navigate([`${title}`]);
  }
}

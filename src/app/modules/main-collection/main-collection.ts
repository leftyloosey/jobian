import { AsyncPipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GraphqlSpinner } from '../../shared/graphql-spinner/graphql-spinner';
import { UserService } from '../../services/user-service/user-service';
import { CollectionsOfOwnerReturn } from '../../utils/types/collection-types';
import { sortByDate } from '../../utils/functions/sort-posts';
import { CollectionCard } from '../../shared/collection-card/collection-card';
@Component({
  selector: 'app-main-collection',
  imports: [AsyncPipe, GraphqlSpinner, CollectionCard],
  templateUrl: './main-collection.html',
  styleUrl: './main-collection.scss',
})
export class MainCollection implements OnInit {
  protected loading = signal<boolean>(true);
  protected error: any;

  display$!: Observable<CollectionsOfOwnerReturn>;

  constructor(private user: UserService) {}

  ngOnInit() {
    this.display$ = this.user.collectionsOfOwner().pipe(
      map((data) => {
        this.loading.set(data.loading);
        const posts = sortByDate(data.data?.collectionsOfOwner?.collections);
        return posts;
      }),
    );
  }
}

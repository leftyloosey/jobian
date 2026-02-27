import { AsyncPipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CollectionService } from '../../services/collection-service/collection-service';
import { CollectionsWithPartial } from '../../utils/types/collection-types';
import { GraphqlSpinner } from '../../shared/graphql-spinner/graphql-spinner';
import { UserService } from '../../services/user-service/user-service';
import { DeepPartial } from '@apollo/client/utilities';

@Component({
  selector: 'app-main-collection',
  imports: [AsyncPipe, RouterLink, GraphqlSpinner],
  templateUrl: './main-collection.html',
  styleUrl: './main-collection.scss',
})
export class MainCollection implements OnInit {
  protected loading = signal<boolean>(true);
  protected error: any;

  display$!: Observable<
    | ({
        __typename?: 'Collection' | undefined;
        id: number;
        heading: string;
        title: string;
        headerImageString: string;
      } | null)[]
    | (
        | DeepPartial<{
            __typename?: 'Collection';
            id: number;
            heading: string;
            title: string;
            headerImageString: string;
          }>
        | null
        | undefined
      )[]
    | null
    | undefined
  >;
  // display$!: Observable<CollectionsWithPartial>;

  constructor(
    private router: Router,
    // private collection: CollectionService,
    private user: UserService,
  ) {}

  ngOnInit() {
    this.display$ = this.user.collectionsOfOwner().pipe(
      map((data) => {
        this.loading.set(data.loading);
        console.log(data.data?.collectionsOfOwner?.collections);
        return data.data?.collectionsOfOwner?.collections;
      }),
    );
    // this.display$ = this.collection.watchCollections().pipe(
    //   map((data) => {
    //     this.loading.set(data.loading);
    //     return data.data?.collectionByUser;
    //   }),
    // );
  }

  openCollection(title: string | undefined): void {
    if (title) {
      const dashedTitle = title.replaceAll(' ', '-');
      console.log(dashedTitle);
      this.router.navigate([`${dashedTitle}`]);
      // this.router.navigate([`${title}`]);
    }
  }
}

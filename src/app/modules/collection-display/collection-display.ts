import { Component, inject } from '@angular/core';
// import { PostService } from '../../services/post-service/post-service';
import { ActivatedRoute, Router } from '@angular/router';
// import { CollectionService } from '../../services/collection-service/collection-service';
// import { map, Observable, switchMap, tap } from 'rxjs';
// import { AsyncPipe } from '@angular/common';
import { Post } from '../../../graphql/generated';

@Component({
  selector: 'app-collection-display',
  imports: [],
  templateUrl: './collection-display.html',
  styleUrl: './collection-display.scss',
})
export class CollectionDisplay {
  private route = inject(ActivatedRoute);

  // protected display$!: Observable<Post[]>;

  // protected current = this.route.snapshot.routeConfig?.path;
  protected title: string = this.route.snapshot.params['title'];
  // protected titleMatch: boolean = false;

  // protected fak: any[] = [];
  protected posts: Post[] = [];
  constructor(
    // private post: PostService,
    // private collection: CollectionService,
    private router: Router
  ) {
    // const title: string = this.route.snapshot.params['title'];

    const url: string = this.route.snapshot.url.join('');
    // console.log(this.route.snapshot.data[0].data.postsByCollectionTitle);
    this.posts = this.route.snapshot.data[0].data.postsByCollectionTitle;

    if (!this.posts.length) this.router.navigate(['/main']);

    // this.display$ = collection
    //   .watchCollections()
    //   .pipe(
    //     map((collection) =>
    //       collection.data?.collectionByUser?.filter(
    //         (item) => item?.title === this.title
    //       )
    //     )
    //   )
    //   .pipe(
    //     map((item: any) => {
    //       if (item) {
    //         return item[0];
    //       }
    //     })
    //   )
    //   .pipe(
    //     switchMap((item: Post) => {
    //       if (item) this.titleMatch = true;
    //       if (item) return this.post.postsInCollection(item?.id);
    //       return this.post.postsInCollection(0);
    //     })
    //   )
    //   .pipe(
    //     tap((item: any) => {
    //       // setTimeout(() => {
    //       // if (!this.titleMatch) this.router.navigate(['/main']);
    //       // }, 1000);
    //       if (item) this.fak = item.postsInCollection;

    //       // return item;
    //     })
    //   );
  }
}

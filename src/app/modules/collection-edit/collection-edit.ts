import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CollectionService } from '../../services/collection-service/collection-service';
import { PostsReturn } from '../../utils/types/post-types';
import { UpdateCollection } from '../../utils/interfaces/UpdateCollection';
import { FindOneWithPostsQuery } from '../../../graphql/generated';
import { ApolloClient, ObservableQuery } from '@apollo/client';

@Component({
  selector: 'app-collection-edit',
  imports: [AsyncPipe],
  templateUrl: './collection-edit.html',
  styleUrl: './collection-edit.scss',
})
export class CollectionEdit {
  private route = inject(ActivatedRoute);
  private collectionId: number = 0;
  public posts$!: Observable<any>;
  // public data$!: Observable<any>;
  public data$!: Observable<
    ObservableQuery.Result<
      FindOneWithPostsQuery,
      'empty' | 'complete' | 'streaming' | 'partial'
    >
  >;

  public submit$!: Observable<ApolloClient.MutateResult<unknown>>;

  protected title: string = '';
  protected heading: string = '';
  protected posts: PostsReturn;

  constructor(
    private router: Router,
    // private posts: PostService,
    private collection: CollectionService
  ) {
    const collectionParam = this.route.snapshot.paramMap.get('id') ?? '';
    this.collectionId = parseInt(collectionParam);

    this.data$ = this.collection
      .watchOneWithPosts(this.collectionId)
      .valueChanges.pipe(
        tap((collection) => {
          if (collection.data?.collectionWithPosts) {
            this.title = collection.data?.collectionWithPosts?.title ?? '';
            this.heading = collection.data?.collectionWithPosts?.heading ?? '';
            this.posts = collection.data?.collectionWithPosts.posts;
          }
        })
      );

    // this.posts$ = this.posts
    //   .postsInCollection(this.IdAsNumber)
    //   .pipe(tap((posts) => posts));
  }
  promp() {
    const hoo = window.prompt('heading?');
    const input: UpdateCollection = {
      title: this.title,
      heading: hoo ?? this.heading,
      id: this.collectionId,
    };
    this.submit$ = this.collection
      .updateCollection(input)
      .pipe(tap((update) => update));
  }

  protected newPost() {
    console.log(this.collectionId);
    this.router.navigate(['/editor/', this.collectionId]);
  }
  protected editPost(id: number) {
    this.router.navigate(['/editor/', 'update', id]);
  }
}

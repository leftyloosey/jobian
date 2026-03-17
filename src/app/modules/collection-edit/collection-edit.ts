import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CollectionService } from '../../services/collection-service/collection-service';
import { PostsReturn } from '../../utils/types/post-types';
import { ApolloClient } from '@apollo/client';
import { CollectionWithPosts } from '../../utils/types/collection-types';
import { GraphqlSpinner } from '../../shared/graphql-spinner/graphql-spinner';
import { sortByDate } from '../../utils/functions/sort-posts';

@Component({
  selector: 'app-collection-edit',
  imports: [AsyncPipe, GraphqlSpinner],
  templateUrl: './collection-edit.html',
  styleUrl: './collection-edit.scss',
})
export class CollectionEdit {
  protected loading = signal<boolean>(true);
  private route = inject(ActivatedRoute);

  private collectionId: number = 0;
  public data$!: CollectionWithPosts;

  public submit$!: Observable<ApolloClient.MutateResult<unknown>>;

  protected title = signal<string>('');
  protected heading = signal<string>('');
  protected posts: PostsReturn;

  constructor(
    private router: Router,
    private collection: CollectionService,
  ) {
    const collectionParam = this.route.snapshot.paramMap.get('id') ?? '';
    this.collectionId = parseInt(collectionParam);

    this.data$ = this.collection
      .watchOneWithPosts(this.collectionId)
      .valueChanges.pipe(
        tap((collection) => {
          if (collection.data?.collectionWithPosts) {
            this.loading.set(collection.loading);
            this.title.set(collection.data?.collectionWithPosts?.title ?? '');
            this.heading.set(
              collection.data?.collectionWithPosts?.heading ?? '',
            );
            this.posts = collection.data?.collectionWithPosts.posts;
            if (this.posts) this.posts = sortByDate(this.posts);
            // if (this.posts) this.posts = sortPostsByDate(this.posts);
          }
        }),
      );
  }

  protected newPost(): void {
    this.router.navigate(['edit/', 'post', this.collectionId]);
  }
  protected editPost(id: number): void {
    this.router.navigate(['edit/post/', 'update', this.collectionId, id]);
  }

  protected backToAdmin() {
    this.router.navigate(['/admin']);
  }
}

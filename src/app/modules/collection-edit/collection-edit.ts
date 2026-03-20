import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CollectionService } from '../../services/collection-service/collection-service';
import { PostsReturn } from '../../utils/types/post-types';
import { ApolloClient } from '@apollo/client';
import { CollectionWithPosts } from '../../utils/types/collection-types';
import { GraphqlSpinner } from '../../shared/graphql-spinner/graphql-spinner';
import { sortByDate } from '../../utils/functions/sort-posts';
import { MatDialog } from '@angular/material/dialog';
import { CreateCollectionDialog } from '../../shared/create-collection-dialog/create-collection-dialog';
import { Post } from '../../../graphql/generated';
import { EditorService } from '../../services/editor-service/editor-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PostService } from '../../services/post-service/post-service';
import {
  CollectionAdminRow,
  onion,
} from '../../shared/collection-admin-row/collection-admin-row';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-collection-edit',
  imports: [
    AsyncPipe,
    GraphqlSpinner,
    CollectionAdminRow,
    MatButton,
    MatButtonModule,
  ],
  templateUrl: './collection-edit.html',
  styleUrl: './collection-edit.scss',
})
export class CollectionEdit {
  // if (this.posts) this.posts = sortPostsByDate(this.posts);

  protected loading = signal<boolean>(true);
  private route = inject(ActivatedRoute);

  private collectionId: number = 0;
  public data$!: CollectionWithPosts;

  public submit$!: Observable<ApolloClient.MutateResult<unknown>>;
  protected newPost!: Observable<ApolloClient.MutateResult<unknown>>;
  protected deletePost!: Observable<ApolloClient.MutateResult<unknown>>;
  protected updatePost!: Observable<ApolloClient.MutateResult<unknown>>;

  readonly dialog = inject(MatDialog);

  protected title = signal<string>('');
  protected heading = signal<string>('');
  protected posts = signal<PostsReturn>(null);
  // protected posts: PostsReturn;

  constructor(
    private router: Router,
    private post: PostService,
    private editor: EditorService,
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

            // this.posts = collection.data?.collectionWithPosts.posts;
            // if (this.posts) this.posts = sortByDate(this.posts);
            this.posts.set(collection.data?.collectionWithPosts.posts);
            if (this.posts()) this.posts.set(sortByDate(this.posts()));
          }
        }),
      );
    this.newPost = editor.$newPostObs.pipe(
      takeUntilDestroyed(),
      switchMap((collection) =>
        this.post.newPost(collection).pipe(tap((result) => result)),
      ),
    );

    this.updatePost = editor.$updatePostObs.pipe(
      takeUntilDestroyed(),
      switchMap((collection) =>
        this.post.updateOne(collection).pipe(
          tap((result) => {
            console.log(result);
            return result;
          }),
        ),
      ),
    );

    this.deletePost = editor.$deletePostObs.pipe(
      takeUntilDestroyed(),
      switchMap((deletePost) =>
        this.post
          .deletePost(deletePost.postId, deletePost.collectionId)
          .pipe(tap((result) => result)),
      ),
    );
  }

  protected openDialog(post: Post | any): void {
    const coll = {
      id: post?.id ?? 0,
      title: post?.title ?? '',
      content: post?.content ?? [],
      heading: post?.heading ?? '',
      headerImageString: post?.headerImageString ?? '',
      postType: true,
    };
    const dialogRef = this.dialog.open(CreateCollectionDialog, {
      data: coll,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const { id, title, heading, headerImageString, content } = result;

        if (id) {
          this.editor.updatePost.next({
            title,
            heading,
            content,
            headerImageString,
            collectionId: this.collectionId,
            id,
          });
        } else {
          this.editor.newPost.next({
            title,
            content: [],
            collectionId: this.collectionId,
            heading,
            headerImageString,
          });
        }
        // this.editor.newPost.next({
        //   title,
        //   content: [],
        //   collectionId: this.collectionId,
        //   heading,
        //   headerImageString,
        // });
      }
    });
  }

  protected createPost(): void {
    // this.router.navigate(['edit/', 'post', this.collectionId]);
    this.openDialog(null);
  }
  protected editPost(id: number): void {
    this.router.navigate(['edit/post/', 'update', this.collectionId, id]);
  }

  deleteThisPost(postId: number): void {
    this.editor.deletePost.next({
      postId,
      collectionId: this.collectionId,
    });
  }
  updateCollection(element: onion) {
    this.openDialog(element);
  }
  deleteCollection(element: onion) {
    const id = element?.id;
    if (id)
      this.editor.deletePost.next({
        postId: id,
        collectionId: this.collectionId,
      });
  }
  shturb(element: onion) {
    const id = element?.id;
    this.router.navigate(['edit/post/', 'update', this.collectionId, id]);
  }

  protected backToAdmin() {
    this.router.navigate(['/admin']);
  }
}

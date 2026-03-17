import { Component, DestroyRef, inject, signal } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { EditorService } from '../../services/editor-service/editor-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { ApolloClient } from '@apollo/client';
import { GraphqlSpinner } from '../../shared/graphql-spinner/graphql-spinner';
import { POSTBASE_TOKEN } from '../../utils/tokens/PostBaseToken';
import { returnEditQuery } from '../../utils/functions/editorReturn';

import Quill from 'quill';
import { PostService } from '../../services/post-service/post-service';

@Component({
  selector: 'app-editor',
  imports: [
    QuillEditorComponent,
    ReactiveFormsModule,
    AsyncPipe,
    GraphqlSpinner,
  ],
  templateUrl: './editor.html',
  styleUrl: './editor.scss',
  providers: [
    {
      provide: PostService,
      useExisting: POSTBASE_TOKEN,
      deps: [POSTBASE_TOKEN],
    },
  ],
})
export class Editor {
  protected form = new FormGroup({
    html: new FormControl(''),
    title: new FormControl(''),
  });

  private updateMode: boolean = false;
  protected postId: number = 0;
  protected collectionId: number = 0;

  protected loading = signal<boolean>(false);

  quill!: Quill;

  private destroyRef = inject(DestroyRef);

  protected newPost!: Observable<ApolloClient.MutateResult<unknown>>;
  protected updatePost!: Observable<ApolloClient.MutateResult<unknown>>;
  protected watchPost!: Observable<ApolloClient.MutateResult<unknown>>;
  protected deletePost!: Observable<ApolloClient.MutateResult<unknown>>;

  constructor(
    private editor: EditorService,
    private post: PostService,
    private router: Router,
  ) {
    // this collectionId is the automatic setting for simply displaying a post/nav without editing
    this.collectionId = this.post.collectionId;

    this.postId = this.post.postId;
    this.updateMode = this.post.updateMode;
    this.watchPost = editor.$watchOneObs.pipe(
      takeUntilDestroyed(),
      switchMap((postId) =>
        this.post.watchOnePost(postId?.postId).valueChanges.pipe(
          takeUntilDestroyed(this.destroyRef),
          tap((post) => {
            const data = returnEditQuery(post);

            // if the post/nav is to bed edited, it will change here
            this.collectionId = data?.collectionId ?? 0;

            this.loading.set(post.loading);
            this.quill.setContents(data?.content ?? []);
            this.form.controls.title.setValue(data?.title ?? '');
          }),
        ),
      ),
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
        this.post.updateOne(collection).pipe(tap((result) => result)),
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

  createEditor(editor: Quill): void {
    const editorCreated = new Promise((resolve, reject) => {
      this.quill = editor;
      resolve('editor created');
      reject('did not create editor');
    }).then(() => {
      if (this.updateMode) {
        this.editor.watchOne.next({ postId: this.postId });
      }
    });
  }

  saveChanges(): void {
    const title = this.form.get('title')?.value ?? 'no_title';
    const delta = this.quill.getContents();

    if (this.updateMode) {
      this.editor.updatePost.next({
        title,
        content: delta.ops,
        collectionId: this.collectionId,
        id: this.postId,
      });
    } else {
      this.editor.newPost.next({
        title,
        content: delta.ops,
        collectionId: this.collectionId,
      });
    }
  }

  deleteThisPost(e: Event): void {
    e.preventDefault();

    this.editor.deletePost.next({
      postId: this.postId,
      collectionId: this.collectionId,
    });
    this.post.backToMenu();
  }

  backToCollectionEdit() {
    this.post.backToMenu();
  }
}

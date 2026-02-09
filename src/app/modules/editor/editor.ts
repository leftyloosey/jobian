import { Component, DestroyRef, inject } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../../services/post-service/post-service';
import { Observable, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorService } from '../../services/editor-service/editor-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { ApolloClient } from '@apollo/client';

import Quill from 'quill';

@Component({
  selector: 'app-editor',
  imports: [QuillEditorComponent, ReactiveFormsModule, AsyncPipe],
  templateUrl: './editor.html',
  styleUrl: './editor.scss',
})
export class Editor {
  protected form = new FormGroup({
    html: new FormControl(''),
    title: new FormControl(''),
  });

  protected postId: number = 0;
  protected collectionId: number = 0;

  private updateMode: boolean = false;

  quill!: Quill;

  private destroyRef = inject(DestroyRef);

  protected newPost!: Observable<ApolloClient.MutateResult<unknown>>;
  protected updatePost!: Observable<ApolloClient.MutateResult<unknown>>;
  protected watchPost!: Observable<ApolloClient.MutateResult<unknown>>;
  protected deletePost!: Observable<ApolloClient.MutateResult<unknown>>;

  constructor(
    private editor: EditorService,
    private post: PostService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    const collectionId = this.route.snapshot.paramMap.get('collectionid') ?? '';
    if (collectionId) this.collectionId = parseInt(collectionId);

    this.watchPost = editor.$watchOneObs.pipe(
      takeUntilDestroyed(),
      switchMap((postId) =>
        this.post.watchOnePost(postId?.postId).valueChanges.pipe(
          takeUntilDestroyed(this.destroyRef),
          tap((post) => {
            const dataForPost = post?.data?.post;
            console.log(dataForPost);

            if (typeof dataForPost?.collectionId === 'number') {
              this.collectionId = dataForPost?.collectionId;
              this.quill.setContents(dataForPost?.content);
              this.form.controls.title.setValue(dataForPost.title ?? '');
            }
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
      const updateId = this.route.snapshot.paramMap.get('id') ?? '';
      const updateMode = this.route.snapshot.paramMap.get('update') ?? 'false';

      if (updateMode === 'update') {
        this.updateMode = true;
        this.postId = parseInt(updateId);
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
    this.router.navigate(['/admin/collection-edit', this.collectionId]);
  }

  backToCollectionEdit() {
    this.router.navigate(['/admin/collection-edit', this.collectionId]);
  }
}

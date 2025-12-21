import { Component, ViewChild } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import Quill from 'quill';
import { PostService } from '../../services/post-service/post-service';
import { Observable, tap } from 'rxjs';
import { ApolloClient, ObservableQuery } from '@apollo/client';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FindOneQuery } from '../../../graphql/generated';

@Component({
  selector: 'app-editor',
  imports: [QuillEditorComponent, ReactiveFormsModule, AsyncPipe],
  templateUrl: './editor.html',
  styleUrl: './editor.scss',
})
export class Editor {
  protected submit$!: Observable<ApolloClient.MutateResult<unknown>>;
  protected delete$!: Observable<ApolloClient.MutateResult<unknown>>;
  protected display$!: Observable<
    ObservableQuery.Result<
      FindOneQuery,
      'empty' | 'complete' | 'streaming' | 'partial'
    >
  >;
  protected postId: number = 0;
  protected form = new FormGroup({
    html: new FormControl(''),
    title: new FormControl(''),
  });
  private updateMode: boolean = false;

  @ViewChild(QuillEditorComponent) quillEditorComponent!: QuillEditorComponent;
  quill!: Quill;
  constructor(
    private fb: FormBuilder,
    private post: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const updateId = this.route.snapshot.paramMap.get('id') ?? '';
    const updateMode = this.route.snapshot.paramMap.get('update') ?? 'false';
    const newId = this.route.snapshot.paramMap.get('newid') ?? '';
    console.log(this.route.snapshot.paramMap);
    console.log(updateId, newId, updateMode);
    if (updateMode === 'update') {
      this.updateMode = true;
      this.postId = parseInt(updateId);
      this.display$ = this.post.watchOnePost(this.postId).valueChanges.pipe(
        tap((post) => {
          // console.log(post.data?.post?.content);
          const dataForPost = post.data?.post;

          if (dataForPost) {
            console.log(dataForPost);
            this.quill.setContents(dataForPost.content);
            this.form.controls.title.setValue(dataForPost.title ?? '');
          }
        })
      );
    } else {
      this.postId = parseInt(newId);
    }
  }

  saveChanges() {
    const title = this.form.get('title')?.value ?? 'no_title';
    const delta = this.quill.getContents();
    if (this.updateMode) {
      this.submit$ = this.post.updateOne(title, delta.ops, this.postId);
    } else {
      this.submit$ = this.post
        .newPost(title, delta.ops, this.postId)
        .pipe(tap((submit) => submit));
    }
  }

  deletePost() {
    this.delete$ = this.post
      .deletePost(this.postId)
      .pipe(tap((deleted) => deleted));
    this.router.navigate(['/editor']);
  }

  created(editor: Quill) {
    this.quill = editor;
  }
}

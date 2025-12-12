import { Component, ViewChild, DestroyRef, inject } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import Quill from 'quill';
import { PostService } from '../../services/post-service/post-service';

@Component({
  selector: 'app-editor',
  imports: [QuillEditorComponent, ReactiveFormsModule],
  templateUrl: './editor.html',
  styleUrl: './editor.scss',
})
export class Editor {
  protected form = new FormGroup({
    html: new FormControl(''),
    title: new FormControl(''),
  });

  private destroyRef = inject(DestroyRef);

  @ViewChild(QuillEditorComponent) quillEditorComponent!: QuillEditorComponent;
  quill!: Quill;
  constructor(private fb: FormBuilder, private post: PostService) {}

  created(editor: Quill) {
    this.quill = editor;
  }

  saveNewPost() {
    const title = this.form.get('title')?.value ?? 'no_title';

    const delta = this.quill.getContents();
    this.post
      .newPost(title, delta, 1)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        console.log(result);
      });
  }
}

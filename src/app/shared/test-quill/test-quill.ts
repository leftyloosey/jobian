import { Component, DestroyRef, inject, ViewChild } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import Quill, { Delta } from 'quill';
import { SanitizeHtmlPipe } from '../../utils/pipes/sanitize-html-pipe';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { PostService } from '../../services/post-service/post-service';
import { S3Service } from '../../services/s3-service/s3-service';
import { S3Put } from '../../utils/interfaces/S3Put';
import { CLOUDFLARE_BUCKET } from '../../utils/constants/constants';
// import { Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-test-quill',
  imports: [QuillEditorComponent, ReactiveFormsModule, SanitizeHtmlPipe],
  templateUrl: './test-quill.html',
  styleUrl: './test-quill.scss',
})
export class TestQuill {
  protected html: string = '';
  private CLOUDFLARE_BUCKET: string = CLOUDFLARE_BUCKET;
  // private createSubscribe!: Subscription;
  protected form = new FormGroup({
    html: new FormControl(''),
    title: new FormControl(''),
  });

  private destroyRef = inject(DestroyRef);

  // pattern: RegExp = /(?:.*[\\/])?([^\\/.]+)(?:\\.[^.]*)?$/;

  @ViewChild(QuillEditorComponent) quillEditorComponent!: QuillEditorComponent;
  quill!: Quill;
  constructor(
    private fb: FormBuilder,
    private post: PostService,
    private s3: S3Service
  ) {}

  created(editor: Quill) {
    this.quill = editor;
    // this.two();
  }

  two() {
    const toolbar: any = this.quill.getModule('toolbar');

    const broback = () => {
      let fileInput = toolbar.container.querySelector(
        'input.ql-image[type=file]'
      );
      if (fileInput == null) {
        fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        // fileInput.setAttribute('alt', 'jambajuice');

        fileInput.setAttribute(
          'accept',
          toolbar.quill.uploader.options.mimetypes.join(', ')
        );
        fileInput.classList.add('ql-image');
        fileInput.addEventListener('change', () => {
          const range2 = this.quill.getSelection(true);
          const removedExtension = fileInput.value.replace(/^.*[\\/]/, '');
          // .replace(/\.[^.]+$/, '');
          console.log(removedExtension);

          const put: S3Put = {
            Key: removedExtension,
            Body: fileInput.files[0],
            ContentType: 'image/png',
          };

          this.s3
            .s3Put(put)
            .then()
            .finally(() => {
              this.insertFromR2(removedExtension);
            });

          // .finally(() => console.log('ho no '));

          // this.quill.uploader.upload(range2, fileInput.files);

          fileInput.value = '';
        });
        toolbar.container.appendChild(fileInput);
      }
      console.log(fileInput.file);
      fileInput.click();
    };

    toolbar.addHandler('image', broback);
  }

  setHTML(delta: Delta) {
    // const delta = this.quill.getContents();
    console.log(delta);

    var cfg = {};
    var converter = new QuillDeltaToHtmlConverter(delta.ops, cfg);

    var html = converter.convert();

    this.html = html;
  }

  insert() {
    const range = this.quill.getSelection();
    console.log(range?.index);
    const bob = range?.index;
    const url = window.prompt('url:');
    if (bob) this.quill.insertEmbed(bob, 'image', url);
  }

  insertFromR2(url: string) {
    const url2 = this.CLOUDFLARE_BUCKET + url;
    const range = this.quill.getSelection();
    const range2 = range?.index;

    if (range2) {
      this.quill.insertEmbed(range2, 'image', url2);
    } else {
      this.quill.insertEmbed(0, 'image', url2);
    }
  }

  async getBucketContents() {
    const hoo = await this.s3.s3List();
    console.log(hoo);
  }

  saveNewPost() {
    const title = this.form.get('title')?.value ?? 'no_title';

    const delta = this.quill.getContents();
    this.post
      .newPost(title, delta.ops, 1)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        console.log(result);
      });
  }

  isQuillImage(op: any) {
    if (typeof op.insert === 'object' && op.insert !== null) {
      return (
        op.insert.image !== undefined || op.insert.customImage !== undefined
      );
    }
    return false;
  }
}

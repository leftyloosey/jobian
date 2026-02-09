import { Component, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { SanitizeHtmlPipe } from '../../utils/pipes/sanitize-html-pipe';
import { PostService } from '../../services/post-service/post-service';
import { ActivatedRoute } from '@angular/router';
import { ObservableQuery } from '@apollo/client';
import { FindOneQuery } from '../../../graphql/generated';

@Component({
  selector: 'app-post-display',
  imports: [AsyncPipe, SanitizeHtmlPipe],
  templateUrl: './post-display.html',
  styleUrl: './post-display.scss',
})
export class PostDisplay {
  private route = inject(ActivatedRoute);
  private idParam: string = this.route.snapshot.params['post'];
  private id: number = parseInt(this.idParam);
  protected display$!: Observable<
    ObservableQuery.Result<
      FindOneQuery,
      'empty' | 'complete' | 'streaming' | 'partial'
    >
  >;

  html: string = '';

  // posts: any[] = [];
  protected loading = signal<boolean>(true);
  // loading = true;
  error: any;

  constructor(private readonly post: PostService) {
    this.display$ = post.watchOnePost(this.id).valueChanges.pipe(
      tap((result) => {
        const item = result.data;
        if (item?.post?.content) {
          const ops = item?.post?.content;
          this.displayFromDelta(ops);
        }
        this.loading.set(result.loading);
        // this.loading = result.loading;
        this.error = result.error;
        result;
      })
    );
  }

  displayFromDelta(delta: any) {
    var cfg = {};
    var converter = new QuillDeltaToHtmlConverter(delta, cfg);

    var html = converter.convert();
    this.html = html;
  }
}

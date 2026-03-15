import { Component, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { SanitizeHtmlPipe } from '../../utils/pipes/sanitize-html-pipe';
import { ActivatedRoute } from '@angular/router';
import { ObservableQuery } from '@apollo/client';
import { FindOneQuery } from '../../../graphql/generated';
import { GraphqlSpinner } from '../../shared/graphql-spinner/graphql-spinner';
import { DISPLAYBASE_TOKEN } from '../../utils/tokens/DisplayBaseToken';
import { PostService } from '../../services/post-service/post-service';
import { returnEditQuery } from '../../utils/functions/editorReturn';

@Component({
  selector: 'app-post-display',
  imports: [AsyncPipe, SanitizeHtmlPipe, GraphqlSpinner],
  providers: [
    {
      provide: PostService,
      useExisting: DISPLAYBASE_TOKEN,
      deps: [DISPLAYBASE_TOKEN],
    },
  ],
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

  protected loading = signal<boolean>(true);
  error: any;

  constructor(private readonly post: PostService) {
    this.display$ = post.watchOnePost(this.post.postId).valueChanges.pipe(
      tap((result) => {
        const item = returnEditQuery(result);
        this.displayFromDelta(item?.content);
        this.loading.set(result.loading);
        this.error = result.error;
        result;
      }),
    );
  }

  displayFromDelta(delta: any) {
    var cfg = {};
    var converter = new QuillDeltaToHtmlConverter(delta, cfg);

    var html = converter.convert();
    this.html = html;
  }
}

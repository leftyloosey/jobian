// import { Apollo } from 'apollo-angular';
// import { Component } from '@angular/core';
// import { FIND_ONE } from './sdl/test-sdl';
// import { Observable, tap } from 'rxjs';
// import { AsyncPipe } from '@angular/common';
// import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
// import { SanitizeHtmlPipe } from '../../utils/pipes/sanitize-html-pipe';

// interface Post {
//   post: {
//     title: string;
//     content: { ops: any };
//   };
// }
// @Component({
//   selector: 'app-test-gql',
//   imports: [AsyncPipe, SanitizeHtmlPipe],
//   templateUrl: './test-gql.html',
//   styleUrl: './test-gql.scss',
// })
// export class TestGql {
//   protected display$!: Observable<any>;

//   html: string = '';

//   posts: any[] = [];
//   loading = true;
//   error: any;

//   constructor(private readonly apollo: Apollo) {
//     // this.display$ = this.apollo
//     //   .watchQuery({
//     //     query: FIND_ONE,
//     //     variables: { id: 2 },
//     //   })
//     //   .valueChanges.pipe(
//     //     tap((result: any) => {
//     //       console.log(result.data);
//     //       const hoo = result.data;
//     //       console.log(hoo?.post?.content);
//     //       if (hoo?.post?.content) {
//     //         const { ops } = hoo?.post?.content;
//     //         console.log(ops);
//     //         this.displayFromDelta(ops);
//     //       }
//     //       this.loading = result.loading;
//     //       this.error = result.error;
//     //       result;
//     //     })
//     //   );
//   }

//   displayFromDelta(delta: any) {
//     var cfg = {};

//     var converter = new QuillDeltaToHtmlConverter(delta, cfg);

//     var html = converter.convert();

//     this.html = html;
//   }

//   ngOnInit() {
//     this.display$ = this.apollo
//       .watchQuery({
//         query: FIND_ONE,
//         variables: { id: 3 },
//       })
//       .valueChanges.pipe(
//         tap((result: any) => {
//           const display = result?.data?.post?.content;
//           if (display) {
//             const { ops } = display;
//             this.displayFromDelta(ops);
//           }
//           this.loading = result.loading;
//           this.error = result.error;
//           result;
//         })
//       );
//   }
// }

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeHtml',
  standalone: true,
})
export class SanitizeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}

// @Pipe({
//   name: "safeHtml",
//   standalone: true,
// })
// export class SafeHtmlPipe {
//   constructor(private sanitizer: DomSanitizer) {}

//   transform(html) {
//     return this.sanitizer.bypassSecurityTrustHtml(html);
//   }
// }

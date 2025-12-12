import {
  ApplicationConfig,
  inject,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { provideHttpClient } from '@angular/common/http';
import { InMemoryCache } from '@apollo/client';
import { provideQuillConfig } from 'ngx-quill/config';
import ImageResize from '@mgreminger/quill-image-resize-module';
import Quill, { Delta } from 'quill';
Quill.register('modules/imageResize', ImageResize);
// console.log(Quill.imports);

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      return {
        link: httpLink.create({ uri: 'http://localhost:3000/graphql' }),
        cache: new InMemoryCache(),
        // other options...
      };
    }),
    provideQuillConfig({
      modules: {
        imageResize: {},
        // syntax: true,
        toolbar: {
          container: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            // ['code-block'],
            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: 'ordered' }, { list: 'bullet' }],
            //[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            //[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            //[{ 'direction': 'rtl' }],                         // text direction

            [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
            //[{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            //[{ 'font': [] }],
            [{ align: [] }],

            ['clean'], // remove formatting button

            // ['link'],
            ['link', 'image', 'video'],
          ],
        },
      },
    }),
  ],
};

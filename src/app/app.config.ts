import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { InMemoryCache } from '@apollo/client';
import { provideQuillConfig } from 'ngx-quill/config';
import ImageResize from '@mgreminger/quill-image-resize-module';
import Quill from 'quill';
import { environment } from '../environments/environment';
Quill.register('modules/imageResize', ImageResize);

import { routes } from './app.routes';
import { LoadingService } from './services/loading-service/loading-service';
import { LoadingInterceptor } from './utils/interceptors/loading-interceptor/loading-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      // BrowserModule,
      // AppRoutingModule,
      // RouterModule,
      LoadingService
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    // provideAppInitializer(() => {
    //   const config = inject(ConfigService);
    // }),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(
      routes
      // withNavigationErrorHandler((error) => {
      //   sig.set(error.url);
      //   const router = inject(Router);
      //   router.navigate(['/redirect', { redirectValue: error.url }]);
      // })
    ),
    provideHttpClient(),
    // provideHttpClient(withInterceptors([loggingInterceptor])),
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      return {
        link: httpLink.create({ uri: environment.DB }),
        // link: httpLink.create({ uri: 'http://localhost:3000/graphql' }),
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

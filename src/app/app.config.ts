import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, RouteReuseStrategy } from '@angular/router';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { ApolloLink, InMemoryCache } from '@apollo/client';
import { provideQuillConfig } from 'ngx-quill/config';
import ImageResize from '@mgreminger/quill-image-resize-module';
import Quill from 'quill';
import { environment } from '../environments/environment';
Quill.register('modules/imageResize', ImageResize);

import { routes } from './app.routes';
import { LoadingService } from './services/loading-service/loading-service';
import { LoadingInterceptor } from './utils/interceptors/loading-interceptor/loading-interceptor';
import { loggingInterceptor } from './utils/interceptors/logging-interceptor/logging-interceptor';
import { CustomRouteReuseStrategy } from './utils/strategies/CustomRouteReuse';
import { loadingLink } from './utils/apollo-links/loading-link';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(LoadingService),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy,
    },

    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),

    provideHttpClient(withInterceptors([loggingInterceptor])),
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      const link = ApolloLink.from([
        loadingLink,
        httpLink.create({ uri: environment.DB }),
      ]);
      return {
        link,
        // link: httpLink.create({ uri: environment.DB }),
        cache: new InMemoryCache(),
      };
    }),
    // const httpLink = inject(HttpLink);
    // return {
    //   link: httpLink.create({ uri: environment.DB }),
    //   cache: new InMemoryCache(),
    // };
    // }),
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

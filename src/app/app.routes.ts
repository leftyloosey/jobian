import { Routes } from '@angular/router';
import { MainCollection } from './modules/main-collection/main-collection';
import { Login } from './modules/login/login';
import { About } from './modules/about/about';
import { Team } from './modules/team/team';
import { Contact } from './modules/contact/contact';
import { Editor } from './modules/editor/editor';
import { Admin } from './modules/admin/admin';
// import { TestGql } from './shared/test-gql/test-gql';
import { TestQuill } from './shared/test-quill/test-quill';
import { CollectionEdit } from './modules/collection-edit/collection-edit';
import { CollectionDisplay } from './modules/collection-display/collection-display';
import { Redirector } from './shared/redirector/redirector';
import { LoginGuard } from './utils/login-guard/login-guard';
import {
  collectionsResolver,
  postResolver,
} from './utils/resolvers/main-resolver-resolver';
// import { redirectorResolver } from './services/redirect-service/redirector-resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  // {
  //   path: '**',
  //   resolve: [redirectorResolver],
  //   redirectTo: 'redirect',
  //   pathMatch: 'full',
  // },
  {
    path: 'redirect',
    // resolve: [redirectorResolver],
    component: Redirector,
  },
  {
    path: 'main',
    // resolve: [collectionsResolver],
    loadComponent: () =>
      import('./modules/main-collection/main-collection').then(
        (load) => load.MainCollection
      ),
  },
  {
    path: 'editor/:update/:id',
    loadComponent: () =>
      import('./modules/editor/editor').then((load) => load.Editor),
  },
  {
    path: 'editor/:newid',
    loadComponent: () =>
      import('./modules/editor/editor').then((load) => load.Editor),
  },
  {
    path: 'admin',
    canActivate: [LoginGuard],
    // children: [
    //   {
    //     path: 'collection-edit',
    //     component: CollectionEdit,
    //     loadComponent: () =>
    //       import('./modules/collection-edit/collection-edit').then(
    //         (load) => load.CollectionEdit
    //       ),
    //   },
    // ],
    loadComponent: () =>
      import('./modules/admin/admin').then((load) => load.Admin),
  },
  {
    path: 'admin/collection-edit/:id',
    loadComponent: () =>
      import('./modules/collection-edit/collection-edit').then(
        (load) => load.CollectionEdit
      ),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./modules/contact/contact').then((load) => load.Contact),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./modules/about/about').then((load) => load.About),
  },
  {
    path: 'team',
    loadComponent: () =>
      import('./modules/team/team').then((load) => load.Team),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./modules/login/login').then((load) => load.Login),
  },
  {
    path: ':title',
    resolve: [postResolver],
    loadComponent: () =>
      import('./modules/collection-display/collection-display').then(
        (load) => load.CollectionDisplay
      ),
  },
];

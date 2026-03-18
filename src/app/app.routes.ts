import { Routes } from '@angular/router';
import { MainCollection } from './modules/main-collection/main-collection';
import { Login } from './modules/login/login';
import { Editor } from './shared/editor/editor';
import { Admin } from './modules/admin/admin';
import { CollectionEdit } from './modules/collection-edit/collection-edit';
import { CollectionDisplay } from './modules/collection-display/collection-display';
import { PostDisplay } from './shared/post-display/post-display';
import { Redirector } from './shared/redirector/redirector';
import { LoginGuard } from './utils/login-guard/login-guard';
import {
  collectionTitleResolver,
  postResolver,
} from './utils/resolvers/main-resolver-resolver';
import { EditorContainer } from './modules/editor-container/editor-container';
import { PostDisplayContainer } from './modules/post-display-container/post-display-container';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    // resolve: [collectionsResolver],
    loadComponent: () =>
      import('./modules/main-collection/main-collection').then(
        (load) => load.MainCollection,
      ),
  },
  {
    path: 'admin',
    canActivate: [LoginGuard],
    loadComponent: () =>
      import('./modules/admin/admin').then((load) => load.Admin),
  },
  {
    path: 'admin/collection-edit/:id',
    loadComponent: () =>
      import('./modules/collection-edit/collection-edit').then(
        (load) => load.CollectionEdit,
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./modules/login/login').then((load) => load.Login),
  },
  // {
  //   path: 'redirect',
  //   component: Redirector,
  // },
  {
    path: 'd/:title',
    loadComponent: () =>
      import('./modules/post-display-container/post-display-container').then(
        (load) => load.PostDisplayContainer,
      ),
  },

  {
    // path: 'display',
    path: 'display/:displaymode/:postid',
    loadComponent: () =>
      import('./modules/post-display-container/post-display-container').then(
        (load) => load.PostDisplayContainer,
      ),
  },
  {
    path: ':title',
    resolve: [postResolver, collectionTitleResolver],
    loadComponent: () =>
      import('./modules/collection-display/collection-display').then(
        (load) => load.CollectionDisplay,
      ),
  },
  {
    path: 'edit/:editormode/:collectionid',
    loadComponent: () =>
      import('./modules/editor-container/editor-container').then(
        (load) => load.EditorContainer,
      ),
  },

  {
    path: 'edit/:editormode/:update/:collectionid/:postid',
    loadComponent: () =>
      import('./modules/editor-container/editor-container').then(
        (load) => load.EditorContainer,
      ),
  },
  {
    path: 'login/:owner',
    loadComponent: () =>
      import('./modules/login/login').then((load) => load.Login),
  },
];
// export const routes: Routes = [
//   // {
//   //   path: '',
//   //   redirectTo: 'main',
//   //   pathMatch: 'full',
//   // },
//   {
//     path: 'main',
//     // resolve: [collectionsResolver],
//     loadComponent: () =>
//       import('./modules/main-collection/main-collection').then(
//         (load) => load.MainCollection,
//       ),
//   },
//   {
//     path: 'admin',
//     canActivate: [LoginGuard],
//     loadComponent: () =>
//       import('./modules/admin/admin').then((load) => load.Admin),
//   },
//   {
//     path: 'admin/collection-edit/:id',
//     loadComponent: () =>
//       import('./modules/collection-edit/collection-edit').then(
//         (load) => load.CollectionEdit,
//       ),
//   },
//   {
//     path: 'login',
//     loadComponent: () =>
//       import('./modules/login/login').then((load) => load.Login),
//   },
//   {
//     path: 'redirect',
//     component: Redirector,
//   },
//   {
//     path: ':title',
//     resolve: [postResolver],
//     loadComponent: () =>
//       import('./modules/collection-display/collection-display').then(
//         (load) => load.CollectionDisplay,
//       ),
//   },
//   {
//     path: 'edit/:editormode/:collectionid',
//     loadComponent: () =>
//       import('./modules/editor-container/editor-container').then(
//         (load) => load.EditorContainer,
//       ),
//   },
//   {
//     path: ':title/:displaymode/:post',
//     loadComponent: () =>
//       import('./modules/post-display-container/post-display-container').then(
//         (load) => load.PostDisplayContainer,
//       ),
//   },
//   {
//     path: 'edit/:editormode/:update/:collectionid/:postid',
//     loadComponent: () =>
//       import('./modules/editor-container/editor-container').then(
//         (load) => load.EditorContainer,
//       ),
//   },
//   {
//     path: 'login/:owner',
//     loadComponent: () =>
//       import('./modules/login/login').then((load) => load.Login),
//   },
// ];

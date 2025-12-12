import { Routes } from '@angular/router';
import { MainMinistry } from './modules/main-ministry/main-ministry';
import { About } from './modules/about/about';
import { Team } from './modules/team/team';
import { Contact } from './modules/contact/contact';
import { Editor } from './modules/editor/editor';
import { Admin } from './modules/admin/admin';
import { TestGql } from './shared/test-gql/test-gql';
import { TestQuill } from './shared/test-quill/test-quill';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: '*',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    loadComponent: () =>
      import('./modules/main-ministry/main-ministry').then(
        (load) => load.MainMinistry
      ),
  },
  {
    path: 'editor',
    loadComponent: () =>
      import('./modules/editor/editor').then((load) => load.Editor),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./modules/admin/admin').then((load) => load.Admin),
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
  // {
  //   path: 'about',
  //   loadComponent: () =>
  //     import('./modules/about/about').then((load) => load.About),
  // },
];

import { ClassProvider, Injectable } from '@angular/core';
import { catchError, firstValueFrom, map } from 'rxjs';
import { NameService } from '../name-service/name-service';
import {
  Collection,
  CollectionByUserGQL,
  CollectionByUserQuery,
} from '../../../graphql/generated';
import { Router } from '@angular/router';
import {
  collectionsResolver,
  postResolver,
} from '../../utils/resolvers/main-resolver-resolver';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class KonfigService {
  public collections: { title: string; id: number }[] = [
    {
      title: '',
      id: 0,
    },
  ];
  // private config: any;
  //   const collection = inject(CollectionByUserGQL);
  // const name = inject(NameService);
  // return collection.fetch({ variables: { authorId: name.getUser() } }).pipe(
  //   map((stuff) => {
  //     console.log(stuff);
  //     return stuff;
  //   })
  // );
  constructor(
    private collection: CollectionByUserGQL,
    private name: NameService,
    private router: Router
  ) {
    // this.getConfig();
    // this.addNewRoute();
    // this.loadConfig()
    //   .pipe(takeUntilDestroyed())
    //   .subscribe((more) => {
    // console.log(more.data?.collectionByUser);
    // const colls = more.data?.collectionByUser;
    // const kolls = colls as [];
    // for (let index = 0; index < kolls.length; index++) {
    //   const element = kolls[index] as Collection;
    //   this.collections.push({ id: element.id, title: element.title });
    //   console.log('soup');
    // const slewRoute = {
    //   path: element.title,
    //   resolve: [postResolver],
    //   loadComponent: () =>
    //     import(
    //       '../../modules/collection-display/collection-display'
    //     ).then((load) => load.CollectionDisplay),
    // };
    // this.addNewerRoute(slewRoute);
    //   }
    // });
    // this.addNewRoute();
  }
  public async getArr() {
    const rKolls: { title: string; id: number }[] = [];
    this.loadConfig()
      .pipe(takeUntilDestroyed())
      .subscribe((more) => {
        console.log(more);
        const colls = more.data?.collectionByUser;
        const kolls = colls as [];

        for (let index = 0; index < kolls.length; index++) {
          const element = kolls[index] as Collection;
          rKolls.push({ id: element.id, title: element.title });
        }
      });
    return rKolls;
  }

  loadConfig() {
    return this.collection
      .fetch({ variables: { authorId: this.name.getUser() } })
      .pipe(
        map((stuff) => {
          // console.log(stuff);
          return stuff;
        })
      );
  }
  // async getConfig() {
  //   const hoo = await firstValueFrom(
  //     this.collection.fetch({ variables: { authorId: this.name.getUser() } })
  //   );
  //   return hoo;
  // }
  newRoute = {
    path: 'jerome',
    resolve: [postResolver],
    loadComponent: () =>
      import('../../modules/main-collection/main-collection').then(
        (load) => load.MainCollection
      ),
  };
  // newRoute = {
  //   path: 'collections',
  //   resolve: {},
  //   component: CollectionDisplay,
  // };

  addNewRoute() {
    // Get the current routes configuration
    console.log('slorp');
    const currentConfig = [...this.router.config];

    // Push the new route definition
    currentConfig.push(this.newRoute);

    // Reset the router configuration with the new array
    this.router.resetConfig(currentConfig);

    console.log('New route added:', this.newRoute.path);
  }
  addNewerRoute(newRoute: any) {
    // Get the current routes configuration

    const currentConfig = [...this.router.config];

    // Push the new route definition
    currentConfig.push(newRoute);

    // Reset the router configuration with the new array
    this.router.resetConfig(currentConfig);

    console.log('New route added:', newRoute.path);
  }
}

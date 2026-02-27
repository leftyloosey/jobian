import { computed, inject, Injectable } from '@angular/core';
import {
  AllNavHeadingsGQL,
  NavMembersByHeadingGQL,
} from '../../../graphql/generated';
import { map } from 'rxjs';
import { NavbarContainer } from '../../modules/navbar-container/navbar-container';
import { NavUserOpen } from '../nav-user-open/nav-user-open';
import { NavAdminOpen } from '../nav-admin-open/nav-admin-open';
import { NameService } from '../name-service/name-service';

@Injectable({
  providedIn: 'root',
})
export class NavbarCreationService {
  public navHeadCollectionId: number = 1;

  protected loggedIn = computed(() => {
    if (this.name.loggedIn() === true) return true;
    return false;
  });

  constructor(
    private allHeadings: AllNavHeadingsGQL,
    private allMembers: NavMembersByHeadingGQL,
    private name: NameService,
  ) {}

  public watchAllHeadings() {
    return this.allHeadings.watch().valueChanges.pipe(
      map((result) => {
        return result;
      }),
    );
  }
  public watchAllMembers(collectionId: number) {
    return this.allMembers
      .watch({
        variables: { collectionId },
      })
      .valueChanges.pipe(
        map((result) => {
          return result;
        }),
      );
  }
  public serviceReturn(navBarContainer: NavbarContainer) {
    let navElemnt = inject(NavUserOpen);
    if (this.loggedIn()) navElemnt = inject(NavAdminOpen);
    console.log('service return before return', navElemnt);
    return navElemnt;
  }
}

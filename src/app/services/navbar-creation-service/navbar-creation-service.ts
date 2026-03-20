import { computed, inject, Injectable, signal } from '@angular/core';
import {
  AllNavHeadingsDocument,
  AllNavHeadingsGQL,
  AllNavMembersDocument,
  CreateNavMemberMutation,
  NavMembersByHeadingDocument,
  NavMembersByHeadingGQL,
  NavMembersByHeadingLengthGQL,
  UpdateNavHeadingInput,
  UpsertNavHeadingGQL,
  UpsertNavHeadingMutation,
} from '../../../graphql/generated';
import { map, Observable } from 'rxjs';
import { NavbarContainer } from '../../modules/navbar-container/navbar-container';
import { NavUserOpen } from '../nav-user-open/nav-user-open';
import { NavAdminOpen } from '../nav-admin-open/nav-admin-open';
import { NameService } from '../name-service/name-service';
import { Apollo } from 'apollo-angular';
import { NavPostService } from '../navpost-service/navpost-service';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class NavbarCreationService {
  public navHeadCollectionId: number;
  public blogTitle = signal<string>('default');

  protected loggedIn = computed(() => {
    if (this.name.loggedIn() === true) return true;
    return false;
  });

  constructor(
    private allHeadings: AllNavHeadingsGQL,
    private allMembers: NavMembersByHeadingGQL,
    private lengthMembers: NavMembersByHeadingLengthGQL,
    private createNavHead: UpsertNavHeadingGQL,
    private navService: NavPostService,
    private name: NameService,
    private titleService: Title,
  ) {
    this.navHeadCollectionId = name.NAV_NUMBER;
  }

  public watchAllHeadings() {
    return this.allHeadings.watch().valueChanges.pipe(
      map((result) => {
        if (result.data) {
          const titleArray = result.data.navHeadings;
          if (titleArray?.length) {
            const title = titleArray[0]?.blogTitle ?? '';
            this.titleService.setTitle(title);
          }
        }

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
  public membersForLength(collectionId: number) {
    return this.lengthMembers
      .watch({
        variables: { collectionId },
      })
      .valueChanges.pipe(
        map((result) => {
          return result;
        }),
      );
  }

  public changeTitle(
    title: string,
  ): Observable<Apollo.MutateResult<UpsertNavHeadingMutation>> {
    const input: UpdateNavHeadingInput = {
      id: this.name.NAV_NUMBER,
      authorId: this.name.getUser(),
      blogTitle: title,
    };
    return this.createNavHead.mutate({
      variables: { input },
      refetchQueries: [
        {
          query: AllNavHeadingsDocument,
        },
      ],
    });
  }
  public addMember(
    title: string,
  ): Observable<Apollo.MutateResult<CreateNavMemberMutation>> {
    const input = {
      collectionId: this.name.NAV_NUMBER,
      content: '',
      title,
    };
    return this.navService.createPost.mutate({
      variables: { input },
      refetchQueries: [
        {
          query: NavMembersByHeadingDocument,
          variables: { collectionId: this.navHeadCollectionId },
        },
        {
          query: AllNavMembersDocument,
        },
      ],
    });
  }

  public serviceReturn(navBarContainer: NavbarContainer) {
    let navElemnt = inject(NavUserOpen);
    if (this.loggedIn()) navElemnt = inject(NavAdminOpen);
    return navElemnt;
  }
}

import { computed, inject, Injectable } from '@angular/core';
import {
  AllNavHeadingsDocument,
  AllNavHeadingsGQL,
  AllNavMembersDocument,
  CreateNavMemberMutation,
  NavMembersByHeadingDocument,
  NavMembersByHeadingGQL,
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
import { LoadingService } from '../loading-service/loading-service';

@Injectable({
  providedIn: 'root',
})
export class NavbarCreationService {
  public navHeadCollectionId: number;

  protected loggedIn = computed(() => {
    if (this.name.loggedIn() === true) return true;
    return false;
  });

  constructor(
    private allHeadings: AllNavHeadingsGQL,
    private allMembers: NavMembersByHeadingGQL,
    private loading: LoadingService,
    private createNavHead: UpsertNavHeadingGQL,
    private navService: NavPostService,
    private name: NameService,
  ) {
    this.navHeadCollectionId = name.NAV_NUMBER;
  }

  public watchAllHeadings() {
    return this.allHeadings.watch().valueChanges.pipe(map((result) => result));
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

  public changeTitle(
    title: string,
    // authorId: number,
    // id: number,
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
  // public addMember(
  //   // collectionId: number,
  //   // content: any,
  //   title: string,
  // ): Observable<Apollo.MutateResult<CreateNavMemberMutation>> {
  //   console.log('nav collec id', this.navHeadCollectionId);
  //   const input = {
  //     collectionId: this.name.NAV_NUMBER,
  //     content: '',
  //     title,
  //   };
  //   return this.createNavMember.mutate({
  //     variables: { input },
  //     refetchQueries: [
  //       {
  //         query: NavMembersByHeadingDocument,
  //         variables: { collectionId: this.navHeadCollectionId },
  //       },
  //       {
  //         query: AllNavMembersDocument,
  //       },
  //     ],
  //   });
  // }

  public serviceReturn(navBarContainer: NavbarContainer) {
    let navElemnt = inject(NavUserOpen);
    if (this.loggedIn()) navElemnt = inject(NavAdminOpen);
    return navElemnt;
  }
}

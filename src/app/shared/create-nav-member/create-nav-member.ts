import { Component } from '@angular/core';
import { NavbarCreationService } from '../../services/navbar-creation-service/navbar-creation-service';
import { AdminService } from '../../services/admin-service/admin-service';
import { CreateNavMemberMutation, NavMember } from '../../../graphql/generated';
import { Apollo } from 'apollo-angular';
import { map, Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { navMemberArrayReturn } from '../../utils/types/nav-types';
import { extractArray } from '../../utils/functions/editorReturn';
import { NAVMEMBER_TOTAL } from '../../utils/constants/constants';

@Component({
  selector: 'app-create-nav-member',
  imports: [AsyncPipe],
  templateUrl: './create-nav-member.html',
  styleUrl: './create-nav-member.scss',
})
export class CreateNavMember {
  protected member$: Observable<Apollo.MutateResult<CreateNavMemberMutation>>;
  protected members$: Observable<navMemberArrayReturn>;

  protected navMemberTotal = NAVMEMBER_TOTAL;
  protected newNavAllowed: boolean = false;

  constructor(
    private navService: NavbarCreationService,
    private admin: AdminService,
  ) {
    this.member$ = admin.$addMemberSubjectObs.pipe(
      switchMap((title) => navService.addMember(title.title)),
    );

    this.members$ = this.navService
      .membersForLength(this.navService.navHeadCollectionId)
      .pipe(
        map((data) => {
          const members = extractArray<typeof data>(data) as NavMember[];
          if (members.length - this.navMemberTotal > 0)
            this.newNavAllowed = true;
          return data?.data?.navMembersInHeading;
        }),
      );
  }

  inputNewMember() {
    const title = window.prompt('Member name ...') ?? '';
    if (title) this.admin.addMemberSubject.next({ title });
  }
}

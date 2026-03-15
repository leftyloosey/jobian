import { Component } from '@angular/core';
import { NavbarCreationService } from '../../services/navbar-creation-service/navbar-creation-service';
import { AdminService } from '../../services/admin-service/admin-service';
import { CreateNavMemberMutation } from '../../../graphql/generated';
import { Apollo } from 'apollo-angular';
import { Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
// import { NavPostService } from '../../services/rost-service/rost-service';

@Component({
  selector: 'app-create-nav-member',
  imports: [AsyncPipe],
  templateUrl: './create-nav-member.html',
  styleUrl: './create-nav-member.scss',
})
export class CreateNavMember {
  $title!: Observable<Apollo.MutateResult<CreateNavMemberMutation>>;

  constructor(
    // private navService: RostService,
    private navService: NavbarCreationService,
    private admin: AdminService,
  ) {
    this.$title = admin.$addMemberSubjectObs.pipe(
      switchMap((title) => navService.addMember(title.title)),
    );
  }

  inputNewTitle() {
    this.admin.addMemberSubject.next({ title: 'maimber' });
  }
}

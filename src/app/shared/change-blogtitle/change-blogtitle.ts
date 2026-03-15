import { Component } from '@angular/core';
import { AdminService } from '../../services/admin-service/admin-service';
import { UpsertNavHeadingMutation } from '../../../graphql/generated';
import { Observable, switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Apollo } from 'apollo-angular';
import { NavbarCreationService } from '../../services/navbar-creation-service/navbar-creation-service';
import { navLoading } from '../../utils/global-signals/global-signals';
import { LoadingService } from '../../services/loading-service/loading-service';

@Component({
  selector: 'app-change-blogitle',
  imports: [AsyncPipe],
  templateUrl: './change-blogtitle.html',
  styleUrl: './change-blogtitle.scss',
})
export class ChangeBlogTitle {
  $title!: Observable<Apollo.MutateResult<UpsertNavHeadingMutation>>;
  constructor(
    private admin: AdminService,
    private loading: LoadingService,
    private createNav: NavbarCreationService,
  ) {
    this.$title = admin.$titleChangeSubjectObs.pipe(
      switchMap((title) =>
        createNav.changeTitle(title.blogTitle).pipe(tap((data) => data)),
      ),
    );
  }

  inputNewTitle() {
    this.admin.titleChangeSubject.next({ blogTitle: 'blog title' });
  }
}

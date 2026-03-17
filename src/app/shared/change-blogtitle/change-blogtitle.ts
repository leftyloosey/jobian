import { Component } from '@angular/core';
import { AdminService } from '../../services/admin-service/admin-service';
import {
  NavHeading,
  UpsertNavHeadingMutation,
} from '../../../graphql/generated';
import { map, Observable, switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Apollo } from 'apollo-angular';
import { NavbarCreationService } from '../../services/navbar-creation-service/navbar-creation-service';
import { LoadingService } from '../../services/loading-service/loading-service';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogActions } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { extractArray } from '../../utils/functions/editorReturn';
import { navHeadingArrayReturn } from '../../utils/types/nav-types';

@Component({
  selector: 'app-change-blogitle',
  imports: [
    AsyncPipe,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButton,
    MatDialogActions,
    MatLabel,
  ],
  templateUrl: './change-blogtitle.html',
  styleUrl: './change-blogtitle.scss',
})
export class ChangeBlogTitle {
  protected changeTitleForm = new FormGroup({
    title: new FormControl('', Validators.required),
  });
  get title() {
    return this.changeTitleForm.get('title') as FormControl;
  }

  protected $titleChange: Observable<
    Apollo.MutateResult<UpsertNavHeadingMutation>
  >;
  protected $title: Observable<navHeadingArrayReturn>;

  constructor(
    private admin: AdminService,
    private loading: LoadingService,
    private createNav: NavbarCreationService,
  ) {
    this.$title = createNav.watchAllHeadings().pipe(
      map((data) => {
        const navHead = extractArray<typeof data>(data) as NavHeading[];
        if (navHead.length) {
          const title = navHead[0];
          this.title.patchValue(title.blogTitle);
        }
        return navHead;
      }),
    );

    this.$titleChange = admin.$titleChangeSubjectObs.pipe(
      switchMap((title) =>
        createNav.changeTitle(title.blogTitle).pipe(tap((data) => data)),
      ),
    );
  }

  inputNewTitle() {
    this.admin.titleChangeSubject.next({ blogTitle: this.title.value });
  }
}

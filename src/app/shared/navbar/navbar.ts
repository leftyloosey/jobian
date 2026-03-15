import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NameService } from '../../services/name-service/name-service';
import { NavbarCreationService } from '../../services/navbar-creation-service/navbar-creation-service';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { NavUserOpen } from '../../services/nav-user-open/nav-user-open';
import { NAVBASE_TOKEN } from '../../utils/tokens/NavBaseToken';
import { extractArray } from '../../utils/functions/editorReturn';
import { NavHeading } from '../../../graphql/generated';
import {
  navHeadingArrayReturn,
  navMemberArrayReturn,
} from '../../utils/types/nav-types';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, AsyncPipe],
  providers: [
    {
      provide: NavUserOpen,
      useExisting: NAVBASE_TOKEN,
      deps: [NAVBASE_TOKEN],
    },
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  protected admin = '/admin';

  protected home = '/main';

  protected heading$!: Observable<navHeadingArrayReturn>;

  protected members$!: Observable<navMemberArrayReturn>;

  protected loading = signal<boolean>(true);
  protected blogTitle = signal<string>('');
  protected headingId: number = 0;

  protected loggedIn = computed(() => {
    if (this.name.loggedIn() === true) return true;
    return false;
  });

  constructor(
    private name: NameService,
    private navHead: NavbarCreationService,
    private navOen: NavUserOpen,
  ) {
    this.heading$ = this.navHead.watchAllHeadings().pipe(
      map((data) => {
        this.loading.set(data.loading);

        const navHead = extractArray<typeof data>(data) as NavHeading[];
        if (navHead.length) {
          const title = navHead[0];
          this.blogTitle.set(title.blogTitle);
          this.headingId = title.id;
        }

        return navHead;
      }),
    );

    this.members$ = this.navHead
      .watchAllMembers(this.navHead.navHeadCollectionId)
      .pipe(
        map((data) => {
          return data?.data?.navMembersInHeading;
        }),
      );
  }

  openNavElement(postId: number | undefined) {
    if (postId) this.navOen.openNavElement(postId);
  }
}

import { Component, computed, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NameService } from '../../services/name-service/name-service';
import { NavbarCreationService } from '../../services/navbar-creation-service/navbar-creation-service';
import { map, Observable } from 'rxjs';
import { DeepPartial } from '@apollo/client/utilities';
import { AsyncPipe } from '@angular/common';
import { NavUserOpen } from '../../services/nav-user-open/nav-user-open';
import { NAVBASE_TOKEN } from '../../utils/tokens/NavBaseToken';

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
  // protected about = '/about';
  // protected team = '/team';
  // protected contact = '/contact';
  protected admin = '/admin';

  protected home = '/main';
  // protected title = 'Will Hardin Ministries';
  protected heading$!: Observable<
    | ({
        __typename?: 'NavHeading' | undefined;
        id: number;
        blogTitle: string;
        authorId: number;
      } | null)[]
    | (
        | DeepPartial<{
            __typename?: 'NavHeading';
            id: number;
            blogTitle: string;
            authorId: number;
          }>
        | null
        | undefined
      )[]
    | null
    | undefined
  >;
  protected members$!: Observable<
    | ({
        __typename?: 'NavMember' | undefined;
        title: string;
        content: any;
        id: number;
      } | null)[]
    | (
        | DeepPartial<{
            __typename?: 'NavMember';
            title: string;
            content: any;
            id: number;
          }>
        | null
        | undefined
      )[]
    | null
    | undefined
  >;

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
        const blogHeading = data?.data?.navHeadings;
        if (blogHeading) {
          if (blogHeading[0]) {
            if (
              typeof blogHeading[0].blogTitle === 'string' &&
              blogHeading[0].id
            ) {
              this.blogTitle.set(blogHeading[0].blogTitle);
              this.headingId = blogHeading[0].id;
            }
          }
        }
        return data.data?.navHeadings;
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

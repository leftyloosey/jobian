import { Component, input, OnInit } from '@angular/core';
import { DeepPartial } from '@apollo/client/utilities';
import { NavUserOpen } from '../../services/nav-user-open/nav-user-open';
export type hoo =
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
  | undefined;
@Component({
  selector: 'app-nav-element-text',
  imports: [],
  templateUrl: './nav-element-text.html',
  styleUrl: './nav-element-text.scss',
})
export class NavElementText implements OnInit {
  constructor(private navOen: NavUserOpen) {}
  id = input<number>();
  idd: number | undefined;
  title = input<string>();
  // member = input<hoo>();
  // member = input<{ title: string; content: any; id: number }>();

  ngOnInit(): void {
    console.log(this.id());
    this.idd = this.id();
    console.log(this.title());
  }

  openNavElement() {
    console.log(this.idd);
    if (this.idd) this.navOen.openNavElement(this.idd);
  }
}

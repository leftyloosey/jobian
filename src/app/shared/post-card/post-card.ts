import { Component, input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Post } from '../../../graphql/generated';
import { Router, RouterLink } from '@angular/router';
import { cleanAndDash } from '../../utils/functions/dashing-functions';

@Component({
  selector: 'app-post-card',
  imports: [MatCardModule, RouterLink],
  templateUrl: './post-card.html',
  styleUrl: './post-card.scss',
})
export class PostCard implements OnInit {
  public postDown = input.required<Post>();
  // protected post!: Post;
  // protected post: Post
  protected title: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.title = this.postDown().title;
    console.log(this.postDown());
  }
  protected goToPost(id: number) {
    const title = cleanAndDash(this.title);
    // this.router.navigate(['d', 'post', id]);
    this.router.navigate(['d', title], { state: { id, displayMode: 'post' } });
    // this.router.navigate(['d', 'post', id, title]);
  }
}

import { Component, input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Post } from '../../../graphql/generated';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-card',
  imports: [MatCardModule, RouterLink],
  templateUrl: './post-card.html',
  styleUrl: './post-card.scss',
})
export class PostCard implements OnInit {
  public postDown = input.required<Post>();
  protected post!: Post;
  // protected post: Post
  protected title: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.post = this.postDown();
    if (this.post?.title) this.title = this.post?.title;
  }
  protected goToPost(id: number) {
    this.router.navigate(['display', this.title, 'post', id]);
  }
}

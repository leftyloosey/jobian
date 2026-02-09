import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../../graphql/generated';
@Component({
  selector: 'app-collection-display',
  imports: [],
  templateUrl: './collection-display.html',
  styleUrl: './collection-display.scss',
})
export class CollectionDisplay {
  private route = inject(ActivatedRoute);
  protected title: string = this.route.snapshot.params['title'];
  protected posts: Post[] = [];

  constructor(private router: Router) {
    const url: string = this.route.snapshot.url.join('');
    this.posts = this.route.snapshot.data[0].data.postsByCollectionTitle;

    if (!this.posts.length) this.router.navigate(['/main']);
  }
  protected goToPost(id: number) {
    this.router.navigate([this.title, id]);
  }
}

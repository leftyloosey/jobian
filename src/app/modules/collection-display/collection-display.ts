import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Collection, Post } from '../../../graphql/generated';
import { extractArray } from '../../utils/functions/editorReturn';
import { sortByDate } from '../../utils/functions/sort-posts';
import { PostCard } from '../../shared/post-card/post-card';

@Component({
  selector: 'app-collection-display',
  imports: [PostCard],
  templateUrl: './collection-display.html',
  styleUrl: './collection-display.scss',
})
export class CollectionDisplay {
  private route = inject(ActivatedRoute);
  protected title: string = this.route.snapshot.params['title'];
  protected deDashedTitle: string = '';
  protected posts: Post[] = [];
  // this component receives post data from postResolver

  constructor(private router: Router) {
    const resolverCollections = this.route.snapshot.data[1].data;
    const resolverPosts = this.route.snapshot.data[0].data;

    const collections: [Collection] =
      extractArray<typeof resolverCollections>(resolverCollections);

    let posts: [Post] = extractArray<typeof resolverPosts>(resolverPosts);
    posts = sortByDate(posts);
    this.posts = posts;

    const isInCollection = this.isUrlInCollections(collections, this.title);
    if (!isInCollection) {
      this.router.navigate(['main']);
    }
  }

  isUrlInCollections(collectionsList: [Collection], urlTitle: string) {
    let count = 0;

    for (let index = 0; index < collectionsList.length; index++) {
      const element = collectionsList[index];
      if (element.urlTitle === urlTitle) {
        this.deDashedTitle = element.title;
        count++;
      }
    }

    return count;
  }
}

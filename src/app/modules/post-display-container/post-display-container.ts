import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NameService } from '../../services/name-service/name-service';
import { PostDisplay } from '../post-display/post-display';
import { PostDisplayService } from '../../services/post-display-service/post-display-service';
import { DISPLAYBASE_TOKEN } from '../../utils/tokens/DisplayBaseToken';

@Component({
  selector: 'app-post-display-container',
  imports: [PostDisplay],
  providers: [
    {
      provide: DISPLAYBASE_TOKEN,
      useFactory: (
        navBarContainer: PostDisplayContainer,
        navbarCreationService: PostDisplayService,
      ) => navbarCreationService.serviceReturn(navBarContainer),
      deps: [PostDisplayContainer, PostDisplayService],
    },
  ],
  templateUrl: './post-display-container.html',
  styleUrl: './post-display-container.scss',
})
export class PostDisplayContainer {
  param = signal<string>('init');
  collectionId = signal<number>(0);
  postId = signal<number>(0);
  updateMode = signal<boolean>(false);
  protected loggedIn = computed(() => {
    if (this.name.loggedIn() === true) return true;
    return false;
  });

  constructor(
    route: ActivatedRoute,
    private name: NameService,
  ) {
    const editorMode = route.snapshot.paramMap.get('displaymode') ?? '';
    // const editorMode = route.snapshot.paramMap.get('editormode') ?? '';
    const collectionIdParam = route.snapshot.paramMap.get('collectionid') ?? '';
    const postIdParam = route.snapshot.paramMap.get('postid') ?? '';
    const updateParam = route.snapshot.paramMap.get('update') ?? '';

    const collectionId = parseInt(collectionIdParam);
    const postId = parseInt(postIdParam);

    this.collectionId.set(collectionId);
    this.postId.set(postId);
    this.param.set(editorMode);
    if (updateParam === 'update') this.updateMode.set(true);
  }
}

import { inject, Injectable } from '@angular/core';
import { ServiceReturn } from '../../utils/types/ServiceReturn';
import { PostDisplayContainer } from '../../modules/post-display-container/post-display-container';
import { PostService } from '../post-service/post-service';
import { NavPostService } from '../navpost-service/navpost-service';
import { PostServiceBaseClass } from '../../utils/interfaces/PostServiceBase';

@Injectable({
  providedIn: 'root',
})
export class PostDisplayService {
  navParamOptions: ServiceReturn[] = [];
  constructor(
    private post: PostService,
    private nav: NavPostService,
  ) {
    for (let service of Object.values(this)) {
      if (service instanceof PostServiceBaseClass) {
        if (service instanceof NavPostService) {
          const toArray: ServiceReturn = { type: service, className: 'nav' };
          this.navParamOptions.push(toArray);
        }
        if (service instanceof PostService) {
          const toArray: ServiceReturn = { type: service, className: 'post' };
          this.navParamOptions.push(toArray);
        }
      }
    }
  }
  public serviceReturn(editorContainer: PostDisplayContainer) {
    let post: NavPostService | PostService = inject(NavPostService);

    this.navParamOptions.forEach((service) => {
      if (service.className === editorContainer.param()) {
        post = service.type;
      }
    });

    post.collectionId = editorContainer.collectionId();
    post.postId = editorContainer.postId();
    post.updateMode = editorContainer.updateMode();
    return post;
  }
}

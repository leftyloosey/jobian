import { inject, Injectable } from '@angular/core';
import { EditorContainer } from '../../modules/editor-container/editor-container';
import { PostServiceBaseClass } from '../../utils/interfaces/PostServiceBase';
import { PostService } from '../post-service/post-service';
import { NavPostService } from '../navpost-service/navpost-service';
import { ServiceReturn } from '../../utils/types/ServiceReturn';

@Injectable({
  providedIn: 'root',
})
export class EditorContainerService {
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
  public serviceReturn(editorContainer: EditorContainer) {
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

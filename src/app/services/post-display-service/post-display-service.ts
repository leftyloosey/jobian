import { inject, Injectable } from '@angular/core';
import { ServiceReturn } from '../../utils/interfaces/ServiceReturn';
import { PostDisplayContainer } from '../../modules/post-display-container/post-display-container';
import { GostService } from '../gost-service/gost-service';
import { RostService } from '../rost-service/rost-service';
import { GostServiceBaseClass } from '../../utils/interfaces/PostServiceBase';

@Injectable({
  providedIn: 'root',
})
export class PostDisplayService {
  navParamOptions: ServiceReturn[] = [];
  constructor(
    private post: GostService,
    private nav: RostService,
  ) {
    for (let service of Object.values(this)) {
      if (service instanceof GostServiceBaseClass) {
        if (service instanceof RostService) {
          const toArray: ServiceReturn = { type: service, className: 'nav' };
          this.navParamOptions.push(toArray);
        }
        if (service instanceof GostService) {
          const toArray: ServiceReturn = { type: service, className: 'post' };
          this.navParamOptions.push(toArray);
        }
      }
    }
  }
  public serviceReturn(editorContainer: PostDisplayContainer) {
    let post: RostService | GostService = inject(RostService);

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

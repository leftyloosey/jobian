import { inject, Injectable } from '@angular/core';
import { EditorContainer } from '../../modules/editor-container/editor-container';
import { GostServiceBaseClass } from '../../utils/interfaces/PostServiceBase';
import { GostService } from '../gost-service/gost-service';
import { RostService } from '../rost-service/rost-service';
import { ServiceReturn } from '../../utils/interfaces/ServiceReturn';

// export type navArrayMember = {
//   type: PostServiceBase;
//   // type: PostServiceBaseClass;
//   className: string;
// };
// export type navArrayMember<
//   T,
//   PostsVars extends OperationVariables,
//   CreateVars extends OperationVariables,
//   UpdateVars extends OperationVariables,
//   RemoveVars extends OperationVariables
// > = {
//   type: PostServiceBase<T, PostsVars, CreateVars, UpdateVars, RemoveVars>;
//   className: string;
// };

@Injectable({
  providedIn: 'root',
})
export class EditorContainerService {
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
  public serviceReturn(editorContainer: EditorContainer) {
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

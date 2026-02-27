import { Router } from '@angular/router';

export interface NavElementBase {
  router: Router;
  openNavElement: (postId: number) => void;
}

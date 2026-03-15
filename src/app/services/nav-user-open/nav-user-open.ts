import { inject, Injectable } from '@angular/core';
import { NavElementBase } from '../../utils/interfaces/NavElementBase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavUserOpen implements NavElementBase {
  router = inject(Router);
  openNavElement(postId: number) {
    this.router.navigate(['display/', 'nav', postId]);
  }
}

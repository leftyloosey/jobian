import { inject, Injectable } from '@angular/core';
import { NavElementBase } from '../../utils/interfaces/NavElementBase';
import { Router } from '@angular/router';
import { sig } from '../../utils/global-signals/global-signals';
@Injectable({
  providedIn: 'root',
})
export class NavAdminOpen implements NavElementBase {
  sig = sig;
  router = inject(Router);

  // constructor(private router: Router) {}
  collectionId: number = 1;
  openNavElement(postId: number) {
    console.log('admin open');
    const url: string = `/edit/nav/update/${this.collectionId}/${postId}`;
    this.sig.set(url);
    this.router.navigate(['redirect']);
  }
}

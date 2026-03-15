import { inject, Injectable } from '@angular/core';
import { NavElementBase } from '../../utils/interfaces/NavElementBase';
import { Router } from '@angular/router';
import { sig } from '../../utils/global-signals/global-signals';
import { NameService } from '../name-service/name-service';
@Injectable({
  providedIn: 'root',
})
export class NavAdminOpen implements NavElementBase {
  sig = sig;
  router = inject(Router);
  collectionId: number = 0;

  constructor(
    private name: NameService,
    // private router: Router,
  ) {
    this.collectionId = name.NAV_NUMBER;
  }

  openNavElement(postId: number) {
    const url: string = `/edit/nav/update/${this.collectionId}/${postId}`;
    this.router.navigate(['/edit/nav/update/', this.collectionId, postId]);
    // this.sig.set(url);
    // this.router.navigate(['redirect']);
  }
}

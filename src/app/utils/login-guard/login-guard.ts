import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { loggedIn } from '../constants/log-cookie';

export const LoginGuard: CanActivateFn = (route, state) => {
  // return true;
  const router = inject(Router);
  const cookie = inject(CookieService);
  const logged = cookie.check(loggedIn);

  if (!logged) {
    const loginPath = router.parseUrl('/login');
    return new RedirectCommand(loginPath, {
      skipLocationChange: true,
    });
  }

  return true;
};

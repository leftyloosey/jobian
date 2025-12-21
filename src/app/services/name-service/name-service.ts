import { Injectable } from '@angular/core';
import { loggedIn } from '../../utils/constants/log-cookie';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { ExtendedPayload } from '../../utils/interfaces/ExtendedPayload';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NameService {
  public userId: number = 0;

  constructor(private cookie: CookieService, private router: Router) {
    if (this.checkLogin()) {
      const id = this.extractIdFromCookie();
      this.setUser(id);
    } else {
      this.router.navigate(['/login']);
    }
  }
  public getUser(): number {
    return this.userId;
  }
  public setUser(receivedId: number): void {
    this.userId = receivedId;
  }

  public extractIdFromResult(token: string): void {
    this.cookie.set(loggedIn, token);
    const cookie = this.cookie.get(loggedIn);
    const decoded: ExtendedPayload = jwtDecode(cookie);
    const { id } = decoded;

    this.setUser(id);
  }

  public extractIdFromCookie(): number {
    const cookie = this.cookie.get(loggedIn);

    const decoded: ExtendedPayload = jwtDecode(cookie);
    const { id } = decoded;
    return id;
  }

  public checkLogin(): boolean {
    if (this.cookie.check(loggedIn)) return true;
    return false;
  }

  public logout() {
    this.cookie.deleteAll();
    // this.gotCookie.set(false);
    // this.router.navigate(['/login']);
  }
}

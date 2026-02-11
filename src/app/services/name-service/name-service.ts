import { Injectable, signal } from '@angular/core';
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
  public loggedIn = signal<boolean>(false);

  constructor(
    private cookie: CookieService,
    private router: Router,
  ) {
    if (this.checkLogin()) {
      const id = this.extractIdFromCookie();
      this.setUser(id);
      this.loggedIn.set(true);
    } else {
      this.router.navigate(['/login']);
    }
    console.log(this.loggedIn());
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
    this.loggedIn.set(true);
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
    this.loggedIn.set(false);
    // this.gotCookie.set(false);
    this.router.navigate(['/home']);
  }
}

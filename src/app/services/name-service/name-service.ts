import { Injectable, signal } from '@angular/core';
import { loggedIn } from '../../utils/constants/log-cookie';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { ExtendedPayload } from '../../utils/interfaces/ExtendedPayload';
import { Router } from '@angular/router';
import { ConfirmLoginService } from '../confirm-login-service/confirm-login-service';

@Injectable({
  providedIn: 'root',
})
export class NameService {
  public userId: number = 0;
  public loggedIn = signal<boolean>(false);

  constructor(
    private cookie: CookieService,
    private confirm: ConfirmLoginService,
    private router: Router,
  ) {
    // confirm.loggedSubject.next(false);
    if (this.checkLogin()) {
      const id = this.extractIdFromCookie();
      this.setUser(id);
      this.loggedIn.set(true);
    }
  }
  public getUser(): number {
    return this.userId;
  }
  private setUser(receivedId: number): void {
    this.userId = receivedId;
  }
  public getOwner(receivedId: number): void {
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

  private extractIdFromCookie(): number {
    const cookie = this.cookie.get(loggedIn);

    const decoded: ExtendedPayload = jwtDecode(cookie);
    const { id } = decoded;
    return id;
  }

  private checkLogin(): boolean {
    if (this.cookie.check(loggedIn)) return true;
    return false;
  }

  public logout() {
    this.cookie.deleteAll('/');
    this.cookie.deleteAll('/login');
    this.loggedIn.set(false);
    this.confirm.loggedSubject.next(false);
    this.router.navigate(['/main']);
  }
}

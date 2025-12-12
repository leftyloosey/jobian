import { Injectable } from '@angular/core';
// import { environment } from '../../../environments/environment';
// import { LoginAttempt } from '../../utils/interfaces/LoginAttempt';
import { catchError, EMPTY, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
// import { loggedIn } from '../../utils/constants/log-cookie';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
// import { ExtendedPayload } from '../../utils/interfaces/ExtendedPayload';
// import { NameService } from '../name-service/name-service';
import { NameService } from '../name-service/name-service';
import { LoginAttempt } from '../../utils/interfaces/LoginAttempt';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private router: Router,
    private name: NameService
  ) {}

  public attemptLogin = (submit: LoginAttempt) => {
    // const url = `${environment.apiBaseUrl}/auth/login`;
    // return this.http
    //   .post<LoginAttempt>(url, submit)
    //   .pipe(
    //     catchError(() => {
    //       window.alert('Login failed.');
    //       return EMPTY;
    //     })
    //   )
    //   .subscribe((result: any) => {
    //     this.cookie.set(loggedIn, result.access_token);
    //     this.setUserInNameService();
    //     this.router.navigate(['/quiz50']);
    //   });
  };

  public attemptCreate = (submit: LoginAttempt) => {
    //     const url = `${environment.apiBaseUrl}/users`;
    //     return this.http
    //       .post<LoginAttempt>(url, submit)
    //       .pipe(
    //         catchError(() => {
    //           window.alert('User creation failed.');
    //           return EMPTY;
    //         })
    //       )
    //       .subscribe((result) => {
    //         console.log(result);
    //         window.alert(`User "${submit.username}" created`);
    //       });
    //   };
    //   private setUserInNameService(): void {
    //     const cookie = this.cookie.get(loggedIn);
    //     const decoded: ExtendedPayload = jwtDecode(cookie);
    //     const { userId } = decoded;
    //     this.name.setUser(userId);
    //   }
  };
}

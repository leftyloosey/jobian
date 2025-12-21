import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { NameService } from '../name-service/name-service';
import { LoginAttempt } from '../../utils/interfaces/LoginAttempt';
import { Apollo } from 'apollo-angular';
import { GET_LOGIN_TOKEN } from './login-gql/login-gql';
import { CREATE_USER } from './login-gql/login-gql';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private cookie: CookieService,
    private name: NameService,
    private apollo: Apollo
  ) {}

  public attemptLogin = (
    submit: LoginAttempt
  ): Observable<Apollo.MutateResult<unknown>> => {
    const input: LoginAttempt = {
      email: submit.email,
      password: submit.password,
    };
    return this.apollo.mutate({
      mutation: GET_LOGIN_TOKEN,
      variables: {
        input,
      },
    });
  };

  public attemptCreate = (
    submit: LoginAttempt
  ): Observable<Apollo.MutateResult<unknown>> => {
    return this.apollo.mutate({
      mutation: CREATE_USER,
      variables: {
        submit,
      },
    });
  };
}

import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormControlStatus,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable, tap } from 'rxjs';
import { LoginService } from '../../services/login-service/login-service';
import {
  CreateAttempt,
  LoginAttempt,
} from '../../utils/interfaces/LoginAttempt';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { NameService } from '../../services/name-service/name-service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmLoginService } from '../../services/confirm-login-service/confirm-login-service';
@Component({
  selector: 'app-login',
  imports: [
    AsyncPipe,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  protected isValid$: Observable<Partial<FormControlStatus>>;
  protected formInvalid: boolean = true;
  protected loginMode: boolean = true;

  protected login$!: Observable<Apollo.MutateResult<unknown>>;
  protected create$!: Observable<Apollo.MutateResult<unknown>>;

  private owner: boolean = false;

  protected loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  constructor(
    private login: LoginService,
    private router: Router,
    private name: NameService,
    private confirm: ConfirmLoginService,
    private route: ActivatedRoute,
  ) {
    this.route.paramMap.subscribe((params) => {
      const owner = params.get('owner');
      if (owner && typeof owner === 'string' && owner === 'owner') {
        this.owner = true;
      }
    });

    this.isValid$ = this.loginForm.statusChanges.pipe(
      tap((changes) => {
        if (changes === 'VALID') this.formInvalid = false;
        if (changes !== 'VALID') this.formInvalid = true;
      }),
    );
  }

  protected submitForLogin(): void {
    const { email, password } = this.loginForm.value;
    let attempt: LoginAttempt;
    if (email && password) {
      attempt = { email, password };
      this.login$ = this.login.attemptLogin(attempt).pipe(
        tap((result: any) => {
          const { token } = result.data.createAuth;
          console.log(token);
          this.name.extractIdFromResult(token);
          this.confirm.loggedSubject.next(false);
          this.router.navigate(['/admin']);
        }),
      );
    }
  }
  protected submitForCreate(): void {
    let passwordConfirm = prompt('Confirm password:');
    const { email, password } = this.loginForm.value;
    let attempt: CreateAttempt;
    if (email && password && passwordConfirm === password) {
      const owner = this.owner;
      console.log('owner!', owner);
      attempt = { email, password, owner };
      this.create$ = this.login.attemptCreate(attempt).pipe(
        tap((create) => {
          window.alert('User created.');
          return create;
        }),
      );
    } else {
      window.alert('Passwords do not match');
    }
  }
}

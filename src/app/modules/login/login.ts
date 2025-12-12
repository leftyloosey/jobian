// import { AsyncPipe } from '@angular/common';
// import { Component } from '@angular/core';
// import {
//   FormGroup,
//   FormControl,
//   Validators,
//   ReactiveFormsModule,
//   FormControlStatus,
// } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { Observable, tap } from 'rxjs';
// import { LoginService } from '../../services/login-service/login-service';
// import { LoginAttempt } from '../../utils/interfaces/LoginAttempt';

// @Component({
//   selector: 'app-login',
//   imports: [
//     AsyncPipe,
//     MatFormFieldModule,
//     MatInputModule,
//     MatSelectModule,
//     MatButtonModule,
//     ReactiveFormsModule,
//   ],
//   templateUrl: './login.html',
//   styleUrl: './login.scss',
// })
// export class Login {
//   protected isValid$: Observable<Partial<FormControlStatus>>;
//   protected formInvalid: boolean = true;
//   protected loginMode: boolean = true;

//   protected loginForm = new FormGroup({
//     username: new FormControl('', Validators.required),
//     password: new FormControl('', Validators.required),
//   });

//   get username() {
//     return this.loginForm.get('username');
//   }
//   get password() {
//     return this.loginForm.get('password');
//   }

//   constructor(private login: LoginService) {
//     this.isValid$ = this.loginForm.statusChanges.pipe(
//       tap((changes) => {
//         if (changes === 'VALID') this.formInvalid = false;
//         if (changes !== 'VALID') this.formInvalid = true;
//       })
//     );
//   }

//   protected submitForLogin(): void {
//     const { username, password } = this.loginForm.value;
//     let attempt: LoginAttempt;
//     if (username && password) {
//       attempt = { username, password };
//       this.login.attemptLogin(attempt);
//     }
//   }
//   protected submitForCreate(): void {
//     let passwordConfirm = prompt('Confirm password:');
//     const { username, password } = this.loginForm.value;
//     let attempt: LoginAttempt;
//     if (username && password && passwordConfirm === password) {
//       attempt = { username, password };
//       this.login.attemptCreate(attempt);
//     } else {
//       window.alert('Passwords do not match');
//     }
//   }
// }

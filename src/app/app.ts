import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingIndicatorComponent } from './shared/loading-indicator-component/loading-indicator-component';
import { NavbarContainer } from './modules/navbar-container/navbar-container';
import { NameService } from './services/name-service/name-service';
import { ConfirmLoginService } from './services/confirm-login-service/confirm-login-service';
import { Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarContainer,
    LoadingIndicatorComponent,
    AsyncPipe,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('jobian_front');
  protected islogged: Observable<boolean>;

  protected navrRefresh = signal(true);

  constructor(
    private name: NameService,
    private confirm: ConfirmLoginService,
  ) {
    this.islogged = confirm.$loggedSubject.pipe(
      tap(() => {
        this.navrRefresh.set(false);

        setTimeout(() => {
          this.navrRefresh.set(true);
        }, 0);
      }),
    );
  }
}

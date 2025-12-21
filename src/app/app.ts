import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/navbar/navbar';

import { LoadingIndicatorComponent } from './shared/loading-indicator-component/loading-indicator-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, LoadingIndicatorComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('jobian_front');
}

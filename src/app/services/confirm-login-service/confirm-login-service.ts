import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmLoginService {
  public loggedSubject = new Subject<boolean>();
  public $loggedSubject = this.loggedSubject.asObservable();
}

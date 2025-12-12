import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Ministry } from '../../utils/interfaces/NewMinistry';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  // public ministries$ = new Subject<Ministry[]>();
  public ministries$ = new BehaviorSubject<Ministry[]>([]);
}

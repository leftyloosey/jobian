import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Collection } from '../../utils/interfaces/NewCollection';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  public ministries$ = new BehaviorSubject<Collection[]>([]);
}

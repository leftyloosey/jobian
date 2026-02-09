import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Collection } from '../../utils/interfaces/NewCollection';
import { UpsertCollectionInputMutation } from '../../../graphql/generated';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  public upsertSubject = new Subject<UpsertCollectionInputMutation>();
  public $upsertSubjectObs = this.upsertSubject.asObservable();

  public deleteSubject = new Subject<{ collectionId: number }>();
  public $deleteSubjectObs = this.deleteSubject.asObservable();
}

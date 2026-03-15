import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  CreateNavMemberInput,
  UpsertCollectionInputMutation,
} from '../../../graphql/generated';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  public upsertSubject = new Subject<UpsertCollectionInputMutation>();
  public $upsertSubjectObs = this.upsertSubject.asObservable();

  public deleteSubject = new Subject<{ collectionId: number }>();
  public $deleteSubjectObs = this.deleteSubject.asObservable();

  public titleChangeSubject = new Subject<{ blogTitle: string }>();
  public $titleChangeSubjectObs = this.titleChangeSubject.asObservable();

  // public addMemberSubject = new Subject<CreateNavMemberInput>();
  public addMemberSubject = new Subject<{
    // collectionId: number;
    title: string;
    // content: string;
  }>();
  public $addMemberSubjectObs = this.addMemberSubject.asObservable();
}

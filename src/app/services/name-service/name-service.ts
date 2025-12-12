import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NameService {
  public userId: number = 1;
  public getUser(): number {
    return this.userId;
  }
  public setUser(receivedId: number): void {
    this.userId = receivedId;
  }
}

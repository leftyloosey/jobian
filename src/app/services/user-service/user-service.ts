import { Injectable } from '@angular/core';
import { CollectionsOfOwnerGQL } from '../../../graphql/generated';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private owner: CollectionsOfOwnerGQL) {}
  public collectionsOfOwner() {
    return this.owner.watch().valueChanges.pipe(
      map((result) => {
        return result;
      }),
    );
  }
}

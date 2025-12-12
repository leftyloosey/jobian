import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CREATE_POST, UPDATE_POST, DELETE_POST } from './post-gql/post-gql';
import { Delta } from 'quill';
import { NewPost } from '../../utils/interfaces/NewPost';
import { UpdatePost } from '../../utils/interfaces/UpdatePost';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private readonly apollo: Apollo) {}

  public newPost(
    title: string,
    content: Delta,
    ministryId: number
  ): Observable<Apollo.MutateResult<unknown>> {
    const input: NewPost = { title, ministryId, content };
    return this.apollo.mutate({
      mutation: CREATE_POST,
      variables: {
        input,
      },
    });
  }

  public updatePost(
    title: string,
    content: Delta,
    id: number
  ): Observable<Apollo.MutateResult<unknown>> {
    const input: UpdatePost = { title, id, content };
    return this.apollo.mutate({
      mutation: UPDATE_POST,
      variables: {
        input,
      },
    });
  }

  public deletePost(id: number): Observable<Apollo.MutateResult<unknown>> {
    const input = { id };
    return this.apollo.mutate({
      mutation: DELETE_POST,
      variables: {
        input,
      },
    });
  }
}

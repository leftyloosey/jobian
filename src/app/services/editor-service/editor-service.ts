import { Injectable } from '@angular/core';
import { Op } from 'quill';
import { Subject } from 'rxjs';
import { NewPost } from '../../utils/interfaces/NewPost';
import { UpdatePost } from '../../utils/interfaces/UpdatePost';

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  public newPost = new Subject<NewPost>();
  public $newPostObs = this.newPost.asObservable();

  public updatePost = new Subject<UpdatePost>();
  public $updatePostObs = this.updatePost.asObservable();

  public deletePost = new Subject<{ postId: number; collectionId: number }>();
  public $deletePostObs = this.deletePost.asObservable();

  public watchOne = new Subject<{ postId: number }>();
  public $watchOneObs = this.watchOne.asObservable();
}

import { InjectionToken } from '@angular/core';
import { PostService } from '../../services/post-service/post-service';

export const DISPLAYBASE_TOKEN = new InjectionToken<PostService>(
  // export const POSTBASE_TOKEN = new InjectionToken<PostService>(
  'display base token',
);

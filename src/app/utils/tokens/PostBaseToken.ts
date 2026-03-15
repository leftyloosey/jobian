import { InjectionToken } from '@angular/core';
import { PostService } from '../../services/post-service/post-service';

export const POSTBASE_TOKEN = new InjectionToken<PostService>(
  'post base token',
);

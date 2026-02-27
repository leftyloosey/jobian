import { InjectionToken } from '@angular/core';
import { PostService } from '../../services/post-service/post-service';
import { GostService } from '../../services/gost-service/gost-service';

// export const POSTBASE_TOKEN = new InjectionToken<GostService>(
export const POSTBASE_TOKEN = new InjectionToken<PostService>(
  'post base token',
);

import { InjectionToken } from '@angular/core';
import { GostService } from '../../services/gost-service/gost-service';

export const DISPLAYBASE_TOKEN = new InjectionToken<GostService>(
  // export const POSTBASE_TOKEN = new InjectionToken<PostService>(
  'display base token',
);

import { InjectionToken, signal } from '@angular/core';
import { PostService } from '../../services/post-service/post-service';

export const sig = signal<string>('');
export const poopState = signal<boolean>(false);
export const nav = signal<boolean>(false);
// export const MPO = new InjectionToken<PostService>('my.Value.token');

import { signal } from '@angular/core';

export const sig = signal<string>('');
export const poopState = signal<boolean>(false);
export const navLoading = signal<boolean>(false);
// export const MPO = new InjectionToken<PostService>('my.Value.token');

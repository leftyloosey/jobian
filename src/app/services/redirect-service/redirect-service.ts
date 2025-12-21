import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RedirectService {
  public collections: { title: string; id: number } = {
    title: '',
    id: 0,
  };
}

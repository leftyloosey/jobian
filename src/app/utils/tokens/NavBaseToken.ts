import { InjectionToken } from '@angular/core';
import { NavUserOpen } from '../../services/nav-user-open/nav-user-open';

export const NAVBASE_TOKEN = new InjectionToken<NavUserOpen>('nav base token');

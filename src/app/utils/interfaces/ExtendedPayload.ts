import { JwtPayload } from 'jwt-decode';

export interface ExtendedPayload extends JwtPayload {
  id: number;
}

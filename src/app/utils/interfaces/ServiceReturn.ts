import { GostService } from '../../services/gost-service/gost-service';
import { RostService } from '../../services/rost-service/rost-service';

export type ServiceReturn = {
  type: GostService | RostService;
  // type: PostService | FostService;
  className: string;
};

import { PostService } from '../../services/post-service/post-service';
import { NavPostService } from '../../services/navpost-service/navpost-service';

export type ServiceReturn = {
  type: PostService | NavPostService;
  className: string;
};

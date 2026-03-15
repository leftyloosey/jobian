import { ApolloLink } from '@apollo/client';
import { map } from 'rxjs';
import { navLoading } from '../global-signals/global-signals';

export const loadingLink = new ApolloLink((operation, forward) => {
  if (operation) navLoading.set(true);

  return forward(operation).pipe(
    map((result) => {
      if (result.data) {
        console.log('sloopey', result);
        navLoading.set(false);
      }

      return result;
    }),
  );
});

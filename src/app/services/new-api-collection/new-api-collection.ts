// import { Injectable } from '@angular/core';
// import { gql, Query } from 'apollo-angular';
// import { Collection } from '../../utils/interfaces/NewCollection';

// export interface Response {
//   collections: Collection[];
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class AllKollectionsGQL extends Query<Response> {
//   document = gql`
//     query CollectionByUser($authorId: Int!) {
//       collectionByUser(authorId: $authorId) {
//         title
//         heading
//         id
//       }
//     }
//   `;
// }

import { Component, input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CollectionWithPartial } from '../../utils/types/collection-types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collection-card',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './collection-card.html',
  styleUrl: './collection-card.scss',
})
export class CollectionCard implements OnInit {
  public collectionDown = input<CollectionWithPartial>();
  protected collection: CollectionWithPartial = {};

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.collection = this.collectionDown();
  }
  openCollection(urlTitle: string | undefined): void {
    if (urlTitle) {
      // navigates by dashed title to make better url display

      this.router.navigate([`${urlTitle}`]);
    }
  }
}

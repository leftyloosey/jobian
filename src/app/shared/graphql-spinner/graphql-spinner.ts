import { Component, ContentChild, input, TemplateRef } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NgTemplateOutlet } from '@angular/common';
@Component({
  selector: 'app-graphql-spinner',
  imports: [MatProgressSpinner, NgTemplateOutlet],
  templateUrl: './graphql-spinner.html',
  styleUrl: './graphql-spinner.scss',
})
export class GraphqlSpinner {
  @ContentChild('loading')
  customLoadingIndicator: TemplateRef<any> | null = null;

  public loading = input<boolean>(false);
}

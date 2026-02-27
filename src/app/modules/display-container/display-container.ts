import { Component } from '@angular/core';
import { PostDisplay } from '../post-display/post-display';
import { PostDisplayService } from '../../services/post-display-service/post-display-service';
import { PostDisplayContainer } from '../post-display-container/post-display-container';
import { DISPLAYBASE_TOKEN } from '../../utils/tokens/DisplayBaseToken';

@Component({
  selector: 'app-display-container',
  imports: [PostDisplay],
  providers: [
    {
      provide: DISPLAYBASE_TOKEN,
      useFactory: (
        displayContainer: PostDisplayContainer,
        displayContainerService: PostDisplayService,
      ) => displayContainerService.serviceReturn(displayContainer),
      deps: [PostDisplayContainer, PostDisplayService],
    },
  ],
  templateUrl: './display-container.html',
  styleUrl: './display-container.scss',
})
export class DisplayContainer {}

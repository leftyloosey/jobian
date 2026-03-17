import { Component } from '@angular/core';
import { NAVBASE_TOKEN } from '../../utils/tokens/NavBaseToken';
import { NavbarCreationService } from '../../services/navbar-creation-service/navbar-creation-service';
import { Navbar } from '../../shared/navbar/navbar';

@Component({
  selector: 'app-navbar-container',
  imports: [Navbar],
  providers: [
    {
      provide: NAVBASE_TOKEN,
      useFactory: (
        navBarContainer: NavbarContainer,
        navbarCreationService: NavbarCreationService,
      ) => navbarCreationService.serviceReturn(navBarContainer),
      deps: [NavbarContainer, NavbarCreationService],
    },
  ],
  templateUrl: './navbar-container.html',
  styleUrl: './navbar-container.scss',
})
export class NavbarContainer {}

import { Component, effect } from '@angular/core';
import { NAVBASE_TOKEN } from '../../utils/tokens/NavBaseToken';
import { NavbarCreationService } from '../../services/navbar-creation-service/navbar-creation-service';
import { Navbar } from '../../shared/navbar/navbar';
import { NameService } from '../../services/name-service/name-service';
import { CdkDialogContainer } from '@angular/cdk/dialog';

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
export class NavbarContainer {
  // protected navRefresh: boolean = true;
  // constructor(private name: NameService) {
  //   effect(() => {
  //     console.log('logged in?', this.name.loggedIn());
  //     this.navRefresh = false;
  //     const srob = new Promise((resolve, reject) => {
  //       if (!this.navRefresh) {
  //         resolve('resolved');
  //       }
  //       reject();
  //     });
  //     srob.then(() => {
  //       console.log('then');
  //       this.navRefresh = true;
  //     });
  //   });
  // }
}

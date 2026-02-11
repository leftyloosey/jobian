import { Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NameService } from '../../services/name-service/name-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  protected about = '/about';
  protected team = '/team';
  protected contact = '/contact';
  protected admin = '/admin';

  protected home = '/main';

  protected title = 'Will Hardin Ministries';

  protected loggedIn = computed(() => {
    if (this.name.loggedIn() === true) return true;
    return false;
  });

  constructor(private name: NameService) {}
}

import { AfterViewInit, Component, inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { sig } from '../../utils/global-signals/global-signals';

@Component({
  selector: 'app-redirector',
  imports: [],
  templateUrl: './redirector.html',
  styleUrl: './redirector.scss',
})
export class Redirector implements AfterViewInit {
  private route = inject(ActivatedRoute);
  current = this.route.snapshot.routeConfig?.path;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.router.navigate([`${sig()}`]);
    }, 0);
  }
}

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
  // =  protected display$!: Observable<Collection[]>;
  constructor(private router: Router) {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      console.log(sig());
      this.router.navigate([`${sig()}`]);
    }, 2000);
  }
  ngOnInit() {
    // this.route.queryParamMap.subscribe((params: ParamMap) => {
    //   const hoo = params.getAll('slorp');
    //   console.log(hoo);
    // });
    // this.display$ = this.route.data.pipe(
    //   tap((stuff: Data) => {
    //     console.log(stuff[0].data.collectionByUser[0]);
    //     return stuff[0].data.collectionByUser[0];
    //   }),
    //   map((stuff) => {
    //     return stuff[0].data.collectionByUser;
    //   })
    // );
    // console.log(this.display$);
  }
}

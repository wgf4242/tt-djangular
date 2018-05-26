import { Component, ChangeDetectorRef } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    titleService: Title,
    router: Router,
    activatedRoute: ActivatedRoute,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {

      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);

      router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          const title = this.getTitle(router.routerState, router.routerState.root).join('-');
          titleService.setTitle(title);
        }
      });
    }

    getTitle(state, parent) {
      const data = [];
      if (parent && parent.snapshot.data && parent.snapshot.data.title) {
        data.push(parent.snapshot.data.title);
      }

      if (state && parent) {
        data.push(... this.getTitle(state, state.firstChild(parent)));
      }
      return data;
    }
  }

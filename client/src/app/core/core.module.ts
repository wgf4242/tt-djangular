import {NgModule, Optional, SkipSelf} from '@angular/core';
import {MatIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";
import {loadSvgResources} from "../utils/svg.utils";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "../app-routing.module";
import {SharedModule} from "../shared/shared.module";
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/observable/merge';
// import 'rxjs/add/observable/from';
// import 'rxjs/add/observable/combineLatest';
// import 'rxjs/add/observable/concat';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/filter';
// import 'rxjs/add/operator/startWith';
// import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/mapTo';
// import 'rxjs/add/operator/count';
// import 'rxjs/add/operator/reduce';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
//

@NgModule({
  imports: [
    SharedModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [SidebarComponent, HeaderComponent, FooterComponent],
  exports: [
    AppRoutingModule,
    SidebarComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule {

  constructor(
    @Optional() @SkipSelf() parent: CoreModule,
    ir: MatIconRegistry,
    ds: DomSanitizer) {
    if (parent) {
      throw new Error('模块已存在，不能再次加载!');
    }
    loadSvgResources(ir, ds);
  }
}

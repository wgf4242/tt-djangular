import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { loadSvgResources } from '../utils/svg.utils';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

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

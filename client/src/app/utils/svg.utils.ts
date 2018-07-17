import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

export const loadSvgResources = (ir: MatIconRegistry, ds: DomSanitizer) => {
  const imgDir = 'static/assets/img';
  const svgDir = `${imgDir}/svg`;
  // ir.addSvgIcon('copy', ds.bypassSecurityTrustResourceUrl(`${svgDir}/ic_content_copy_black_24px.svg`));
  // ir.addSvgIcon('info', ds.bypassSecurityTrustResourceUrl(`${svgDir}/ic_info_black_24px.svg`));
  // ir.addSvgIcon('search', ds.bypassSecurityTrustResourceUrl(`${svgDir}/ic_search_black_24px.svg`));
  // ir.addSvgIcon('settings', ds.bypassSecurityTrustResourceUrl(`${svgDir}/ic_settings_black_24px.svg`));
  // ir.addSvgIcon('work', ds.bypassSecurityTrustResourceUrl(`${svgDir}/ic_work_black_24px.svg`));
};

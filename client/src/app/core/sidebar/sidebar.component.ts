import { Component } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('heroState', [
      state('inactive', style({
        display: 'none',
        transform: 'translateY(-50%)'
      })),
      state('active',   style({transform: 'translateY(0)'})),
      // state('active',   style({transform: 'translateX(0) scale(1.1)'})),
      transition('inactive => active', animate('100ms cubic-bezier(0.47, 0, 0.745, 0.715)')),
      transition('active => inactive', animate('100ms ease-out')),
      // transition('void => inactive', [
      //   style({transform: 'translateX(-100%) scale(1)'}),
      //   animate(100)
      // ]),
      // transition('inactive => void', [
      //   animate(100, style({transform: 'translateX(100%) scale(1)'}))
      // ]),
      // transition('void => active', [
      //   style({transform: 'translateX(0) scale(0)'}),
      //   animate(200)
      // ]),
      // transition('active => void', [
      //   animate(200, style({transform: 'translateX(0) scale(0)'}))
      // ])
    ])
  ]
})
export class SidebarComponent {
  show = false;
  state = 'inactive';

  navItems = [
    { span: '设备管理',       icon: 'devices',      link: '/line/facility' },
    { span: '投产验收',       icon: 'home',         link: '/line/production' },
    { span: '线路信息',       icon: 'settings',     link: '/line/info' },
    { span: '变压器管理',     icon: 'home',         link: '/line/transformer' },
    { span: '跳闸统计',       icon: 'bar_chart',    link: '' },
  ]
  constructor() { }

  onClick() {
    this.show = !this.show;
    this.state = this.state === 'active' ? 'inactive' : 'active';
  }
}

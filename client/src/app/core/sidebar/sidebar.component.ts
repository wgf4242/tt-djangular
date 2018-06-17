import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  navItems = [
    { span: '设备管理',       icon: 'devices',      link: '/line/facility' },
    { span: '投产验收',       icon: 'home',         link: '/line/production' },
    { span: '线路信息',       icon: 'settings',     link: '/line/info' },
    { span: '变压器管理',     icon: 'home',         link: '/line/transformer' },
    { span: '跳闸统计',       icon: 'bar_chart',    link: '' },
  ]
  constructor() { }
}

import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-attendance',
  template: `<h3 class='noprint'>工时管理</h3>
    <attendance-home></attendance-home>
    <router-outlet></router-outlet>

  `,
})
export class AttandenceComponent implements OnInit{
  ngOnInit() {
    console.log(1)
  }
}

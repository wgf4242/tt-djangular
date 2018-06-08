import {Component, OnInit} from '@angular/core';
import {LineService} from '../../_services/line.service';
import {Line} from '../../_models/line';

@Component({
  selector: 'app-line-info',
  templateUrl: './line-info.component.html',
  styleUrls: ['./line-info.component.css']
})
export class LineInfoComponent implements OnInit {
  lines: Line[];

  constructor(private lineServie: LineService) {
  }

  ngOnInit() {
    this.lineServie.getLines().subscribe(lines => {
      this.lines = lines;
    })
  }

}

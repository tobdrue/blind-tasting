import {Component, OnInit} from '@angular/core';
import {TastingSetService} from '../services/tasting-set.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor(public readonly tastingSetService: TastingSetService) {
  }

  ngOnInit(): void {
  }

}

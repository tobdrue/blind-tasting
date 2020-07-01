import {Component, Input, OnInit} from '@angular/core';
import {BeerSelection} from "../../types/beer-selection.interface";
import {FileManagerService} from "../../services/file-manager.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-beer-tile',
  templateUrl: './beer-tile.component.html',
  styleUrls: ['./beer-tile.component.scss']
})
export class BeerTileComponent implements OnInit {

  @Input()
  public beerSelection: BeerSelection;
  public beerIconSrc: Observable<string>;

  constructor(private fileManagerService: FileManagerService) {
  }

  ngOnInit(): void {
    this.beerIconSrc = this.fileManagerService.downLoadUrl(this.beerSelection.beer.beerIcon);
  }
}

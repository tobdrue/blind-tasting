import {Component, Input, OnInit} from '@angular/core';
import {BeerSelection} from '../../types/beer-selection.interface';
import {FileManagerService} from '../../services/file-manager.service';
import {Observable} from 'rxjs';
import {UsernameService} from "../../services/username.service";

@Component({
  selector: 'app-beer-tile',
  templateUrl: './beer-tile.component.html',
  styleUrls: ['./beer-tile.component.scss']
})
export class BeerTileComponent implements OnInit {

  @Input()
  public beerSelection: BeerSelection;
  public beerIconSrc: Observable<string>;

  constructor(private fileManagerService: FileManagerService,
              private usernameService: UsernameService) {
  }

  ngOnInit(): void {
    this.beerIconSrc = this.fileManagerService.downLoadUrl(this.beerSelection.beer.beerIcon);
  }

  public alreadyRated(): boolean {
    return !!this.beerSelection.users.find(user => user.name === this.usernameService.username).guessed;
  }
}

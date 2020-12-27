import {Component, OnInit} from '@angular/core';
import {TastingSetService} from '../services/tasting-set.service';
import {ActivatedRoute} from '@angular/router';
import {BeerSelection} from '../types/beer-selection.interface';
import {Observable} from 'rxjs';
import {FileManagerService} from '../services/file-manager.service';
import {switchMap} from 'rxjs/operators';
import {User} from "../types/user.interface";
import {UsernameService} from "../services/username.service";
import { DetailGuess } from '../types/detail-guess.interface';

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html',
  styleUrls: ['./beer-detail.component.scss']
})
export class BeerDetailComponent implements OnInit {

  public beer$: Observable<BeerSelection>;

  public breweryIconSrc: Observable<string>;
  public beerIconSrc: Observable<string>;
  public additionalTastingDataOpen = false;

  constructor(private tastingSetService: TastingSetService,
              private activatedRoute: ActivatedRoute,
              public fileManagerService: FileManagerService,
              private usernameService: UsernameService) {
  }

  ngOnInit(): void {
    this.beer$ = this.tastingSetService.getBeer(this.activatedRoute.snapshot.queryParamMap.get('beerId'));
    this.breweryIconSrc = this.beer$.pipe(switchMap(beer => this.fileManagerService.downLoadUrl(beer.beer.breweryIcon)));
    this.beerIconSrc = this.beer$.pipe(switchMap(beer => this.fileManagerService.downLoadUrl(beer.beer.beerIcon)));
  }

  public getUser(beer: BeerSelection): User {
    return beer.users.find(user => user.name === this.usernameService.username);
  }

  public userHasDetailGuess(detailGuess: DetailGuess): boolean {
    return !!detailGuess?.bitterness ||
      !!detailGuess.color ||
      !!detailGuess.foam ||
      !!detailGuess.intensity ||
      !!detailGuess.length ||
      !!detailGuess.opacity ||
      !!detailGuess.otherTastes ||
      !!detailGuess.smell ||
      !!detailGuess.sourness ||
      !!detailGuess.sweetness;
  }
}

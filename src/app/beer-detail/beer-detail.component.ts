import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {BeerSelection} from '../types/beer-selection.interface';
import {Observable} from 'rxjs';
import {FileManagerService} from '../services/file-manager.service';
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html',
  styleUrls: ['./beer-detail.component.scss']
})
export class BeerDetailComponent implements OnInit {

  public beer$: Observable<BeerSelection>;

  public breweryIconSrc: Observable<string>
  public beerIconSrc: Observable<string>

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              public fileManagerService: FileManagerService) {
  }

  ngOnInit(): void {
    this.beer$ = this.userService.getBeer(this.activatedRoute.snapshot.queryParamMap.get('beerId'));
    this.breweryIconSrc = this.beer$.pipe(switchMap(beer => this.fileManagerService.downLoadUrl(beer.beer.breweryIcon)));
    this.beerIconSrc = this.beer$.pipe(switchMap(beer => this.fileManagerService.downLoadUrl(beer.beer.beerIcon)));
  }

}

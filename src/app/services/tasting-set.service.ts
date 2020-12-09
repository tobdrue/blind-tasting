import {Injectable} from '@angular/core';
import {combineLatest, merge, Observable, ReplaySubject, Subject, Subscription} from 'rxjs';
import {TastingSet} from '../types/tasting-set.interface';
import {map, skipWhile, switchMap, take, tap} from 'rxjs/operators';
import {BeerSelection} from '../types/beer-selection.interface';
import {AngularFirestore} from '@angular/fire/firestore';
import {ActivatedRoute} from '@angular/router';
import {DetailGuess} from '../types/detail-guess.interface';

@Injectable({
  providedIn: 'root'
})
export class TastingSetService {

  private tastingSet$: ReplaySubject<TastingSet> = new ReplaySubject<TastingSet>(1);
  private tastingSetId$: ReplaySubject<string> = new ReplaySubject<string>(1);
  private fireStoreSubscription: Subscription;
  private readonly TASTING_SET_COLLECTION = 'users';
  private tastingSetIdSubject: Subject<string> = new Subject<string>();

  constructor(private readonly angularFirestore: AngularFirestore,
              private readonly activatedRoute: ActivatedRoute) {
    this.fireStoreSubscription = merge(activatedRoute.queryParamMap.pipe(
      skipWhile(queryParamMap => queryParamMap.keys.length <= 0),
      map(queryParamMap => queryParamMap.get('userId'))),
      this.tastingSetIdSubject.asObservable()).pipe(
      tap(tastingSetId => this.tastingSetId$.next(tastingSetId)),
      switchMap(tastingSetId =>
        angularFirestore.collection(this.TASTING_SET_COLLECTION).doc<TastingSet>(tastingSetId).valueChanges()))
      .subscribe(tastingSet => this.tastingSet$.next(tastingSet));
  }


  public hasDrunkBeer(beerId: string, userName: string): Observable<boolean> {
    return this.tastingSet$.pipe(map(tastingSet =>
      Boolean(this.findBeer(tastingSet, beerId).users.find(user => user.name === userName).guessed)));
  }

  public get allTastingSetBeers(): Observable<BeerSelection[]> {
    return this.tastingSet$.pipe(map(tastingSet => tastingSet.beers));
  }

  public setGuess(beerId: string, guess: string, rating: number, detailGuess: DetailGuess, username: string): void {
    combineLatest([this.tastingSet$, this.tastingSetId$])
      .pipe(take(1)).subscribe(value => {
      const beer = this.findBeer(value[0], beerId);
      const user = beer.users.find(userToFind => userToFind.name === username);
      user.guessed = guess;
      user.rating = rating;
      user.detailGuess = detailGuess;
      this.tastingSet$.next(value[0]);
      void this.angularFirestore.collection(this.TASTING_SET_COLLECTION).doc<TastingSet>(value[1]).set(value[0]);
    });
  }

  public getBeer(beerId: string): Observable<BeerSelection> {
    return this.tastingSet$.pipe(map(tastingSet => this.findBeer(tastingSet, beerId)));
  }

  private findBeer(tastingSet: TastingSet, beerId: string): BeerSelection {
    return tastingSet.beers.find(beers => beerId === beers.beer.id);
  }

  public set nextTastingSetId(tastingSetId: string) {
    this.tastingSetIdSubject.next(tastingSetId);
  }

  public addUser(name: any): void {
    combineLatest([this.tastingSet$, this.tastingSetId$])
      .pipe(take(1)).subscribe(value => {
      value[0].beers.forEach(beer => {
        const newUser = {name, guessed: '', rating: 0, detailGuess: null};
        if (!!beer.users) {
          beer.users.push(newUser);
        } else {
          beer.users = [newUser];
        }
      });
      this.tastingSet$.next(value[0]);
      void this.angularFirestore.collection(this.TASTING_SET_COLLECTION).doc<TastingSet>(value[1]).set(value[0]);
    });
  }
}

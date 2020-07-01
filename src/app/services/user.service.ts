import {Injectable} from '@angular/core';
import {combineLatest, merge, Observable, ReplaySubject, Subject, Subscription} from 'rxjs';
import {User} from '../types/user.interface';
import {map, skipWhile, switchMap, take, tap} from 'rxjs/operators';
import {BeerSelection} from '../types/beer-selection.interface';
import {AngularFirestore} from '@angular/fire/firestore';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user$: ReplaySubject<User> = new ReplaySubject<User>(1);
  private userId$: ReplaySubject<string> = new ReplaySubject<string>(1);
  private fireStoreSubscription: Subscription;
  private readonly USER_COLLECTION = 'users';
  private userIdSubject: Subject<string> = new Subject<string>();

  constructor(private readonly angularFirestore: AngularFirestore,
              private readonly activatedRoute: ActivatedRoute) {
    this.fireStoreSubscription = merge(activatedRoute.queryParamMap.pipe(
      skipWhile(queryParamMap => queryParamMap.keys.length <= 0),
      map(queryParamMap => queryParamMap.get('userId'))),
      this.userIdSubject.asObservable()).pipe(
      tap(userId => this.userId$.next(userId)),
      switchMap(userId =>
        angularFirestore.collection(this.USER_COLLECTION).doc<User>(userId).valueChanges()))
      .subscribe(user => this.user$.next(user));
  }


  public hasDrunkBeer(beerId: string): Observable<boolean> {
    return this.user$.pipe(map(user => Boolean(this.findBeer(user, beerId).guessed)));
  }

  public get allUserBeers(): Observable<BeerSelection[]> {
    return this.user$.pipe(map(user => user.beers));
  }

  public setGuess(beerId: string, guess: string, rating: number): void {
    combineLatest([this.user$, this.userId$])
      .pipe(take(1)).subscribe(value => {
        const beer = this.findBeer(value[0], beerId);
        beer.guessed = guess;
        beer.rating = rating;
        this.user$.next(value[0]);
        void this.angularFirestore.collection(this.USER_COLLECTION).doc<User>(value[1]).set(value[0]);
      }
    )
    ;

  }

  public getBeer(beerId: string): Observable<BeerSelection> {
    return this.user$.pipe(map(user => this.findBeer(user, beerId)));
  }

  private findBeer(user: User, beerId: string): BeerSelection {
    return user.beers.find(beers => beerId === beers.beer.id);
  }

  public set nextUserId(userId: string) {
    this.userIdSubject.next(userId);
  }
}

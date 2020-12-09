import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {TastingSetService} from './services/tasting-set.service';
import {map} from 'rxjs/operators';
import {UsernameService} from './services/username.service';

@Injectable({
  providedIn: 'root'
})
export class AlreadyViewedGuard implements CanActivate {

  constructor(private readonly tastingSetService: TastingSetService,
              private readonly usernameService: UsernameService,
              private readonly router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const beerId = next.queryParamMap.get('beerId');
    this.tastingSetService.nextTastingSetId = next.queryParamMap.get('userId');
    return this.tastingSetService.hasDrunkBeer(beerId, this.usernameService.username).pipe(
      map(hasDrunk => hasDrunk ? true : this.router.createUrlTree(['/estimate'], {
        queryParams: next.queryParams
      })));
  }

}

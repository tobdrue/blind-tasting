import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from './services/user.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlreadyViewedGuard implements CanActivate {

  constructor(private readonly userService: UserService,
              private readonly router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const beerId = next.queryParamMap.get('beerId');
    this.userService.nextUserId = next.queryParamMap.get('userId');
    return this.userService.hasDrunkBeer(beerId).pipe(
      map(hasDrunk => hasDrunk ? true : this.router.createUrlTree(['/estimate'], {
        queryParams: {beerId},
        queryParamsHandling: 'merge'
      })));
  }

}

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UsernameService} from './services/username.service';

@Injectable({
  providedIn: 'root'
})
export class UserSelectionGuard implements CanActivate {

  constructor(private usernameService: UsernameService,
              private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!!this.usernameService.username) {
      return true;
    }

    return this.router.createUrlTree(['/user-selection'], {queryParams: next.queryParams});
  }

}

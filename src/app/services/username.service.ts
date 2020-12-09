import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UsernameService {

  constructor(private cookieService: CookieService) {
  }

  private name: string;

  public get username(): string {
    if (!this.name) {
      this.name = this.cookieService.get('blind-tasting-selected-user');
    }
    return this.name;
  }

  public set username(name: string) {
    this.name = name;
  }

  public set cookie(name: string) {
    this.cookieService.set('blind-tasting-selected-user', name);
  }
}

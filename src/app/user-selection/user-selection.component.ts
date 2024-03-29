import {Component, OnInit} from '@angular/core';
import {TastingSetService} from '../services/tasting-set.service';
import {UsernameService} from '../services/username.service';
import {map, take} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.scss']
})
export class UserSelectionComponent implements OnInit {

  public names: Observable<string[]>;
  public cookieAllowed: boolean;
  public showInput = false;
  public selectedName: string;

  constructor(private tastingSetService: TastingSetService,
              private usernameService: UsernameService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.names = this.tastingSetService.allTastingSetBeers.pipe(
      map(beers => this.unifyArray(this.flatArray<string>(
        beers.filter(beer => beer.users).map(beer => beer.users?.map<string>(user => user.name))))));
  }

  private flatArray<T>(arrayOfArrays: T[][]): T[]{
    return [].concat(...arrayOfArrays);
  }

  private unifyArray(array: string[]): string[] {
    return [...new Set(array)];
  }

  addUser(name: string): void {
    this.names.pipe(take(1)).subscribe(names => {
      if (!names.find(existingName => name === existingName)) {
        this.tastingSetService.addUser(name);
        this.showInput = false;
        this.selectedName = name;
      } else {
        this.snackBar.open('Denk dir was neues aus!', 'X');
      }
    });
  }

  selectUser(name: string): void {
    this.usernameService.username = name;
    if (this.cookieAllowed) {
      this.usernameService.cookie = name;
    }
    this.router.navigate(['beer'], {queryParamsHandling: 'preserve'}).catch(err => console.log(err));
  }

}

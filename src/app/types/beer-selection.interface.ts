import {Beer} from './beer.interface';
import {User} from './user.interface';

export interface BeerSelection {
  beer: Beer;
  users: User[];
}

import {DetailGuess} from './detail-guess.interface';

export interface User {
  name: string;
  guessed: string;
  rating: number;
  detailGuess?: DetailGuess;
}

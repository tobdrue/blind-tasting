export interface Beer {
  id: string;
  brewery: string;
  name: string;
  alcohol: number;
  description: string;
  ingredients: string;
  hints: string;
  slogan?: string;
  hopOrigin?: string;
  website?: string;
  breweryIcon?: string;
  beerIcon?: string;
}

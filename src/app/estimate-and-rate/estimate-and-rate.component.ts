import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {TastingSetService} from '../services/tasting-set.service';
import {UsernameService} from "../services/username.service";


@Component({
  selector: 'app-estimate-and-rate',
  templateUrl: './estimate-and-rate.component.html',
  styleUrls: ['./estimate-and-rate.component.scss']
})
export class EstimateAndRateComponent implements OnInit {
  public guess: FormGroup;

  public helpOpen = false;

  public set rating(rating: number) {
    this.guess.get('rating').setValue(rating);
  }

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar,
              private tastingSetService: TastingSetService,
              private usernameService: UsernameService) {
  }

  ngOnInit(): void {
    this.guess = this.formBuilder.group({
      guess: ['', [Validators.required]],
      rating: ['', [Validators.required]],
      color: [''],
      opacity: [''],
      foam: [''],
      smell: [''],
      sweetness: [''],
      sourness: [''],
      bitterness: [''],
      intensity: [''],
      length: [''],
      otherTastes: ['']
    });
  }


  private displayErrorPopup(): void {
    this.snackBar.open('Seggl füll was aus', 'X');
  }

  public setGuess(): void {
    if (!this.guess.valid) {
      this.displayErrorPopup();
      return;
    }
    const beerId = this.activatedRoute.snapshot.queryParamMap.get('beerId');
    const detailGuess = {
      color: this.guess.get('color').value,
      opacity: this.guess.get('opacity').value,
      foam: this.guess.get('foam').value,
      smell: this.guess.get('smell').value,
      sweetness: this.guess.get('sweetness').value,
      sourness: this.guess.get('sourness').value,
      bitterness: this.guess.get('bitterness').value,
      intensity: this.guess.get('intensity').value,
      length: this.guess.get('length').value,
      otherTastes: this.guess.get('otherTastes').value
    };

    this.tastingSetService.setGuess(beerId,
      this.guess.get('guess').value,
      this.guess.get('rating').value,
      detailGuess,
      this.usernameService.username);
    this.router.navigate(['beer'], {queryParamsHandling: 'preserve'});
  }
}

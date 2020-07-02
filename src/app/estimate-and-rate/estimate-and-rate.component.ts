import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../services/user.service';


@Component({
  selector: 'app-estimate-and-rate',
  templateUrl: './estimate-and-rate.component.html',
  styleUrls: ['./estimate-and-rate.component.scss']
})
export class EstimateAndRateComponent implements OnInit {
  public guess: FormGroup;

  public set rating(rating: number) {
    this.guess.get('rating').setValue(rating);
  }

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.guess = this.formBuilder.group({
      guess: ['', [Validators.required]],
      rating: ['', [Validators.required]]
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
    this.userService.setGuess(beerId, this.guess.get('guess').value, this.guess.get('rating').value);
    this.router.navigate(['beer'], {queryParams: {beerId}, queryParamsHandling: 'merge'});
  }
}

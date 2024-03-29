import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BeerDetailComponent} from './beer-detail/beer-detail.component';
import {OverviewComponent} from './overview/overview.component';
import {EstimateAndRateComponent} from './estimate-and-rate/estimate-and-rate.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {BeerTileComponent} from './overview/beer-tile/beer-tile.component';
import {MatDividerModule} from "@angular/material/divider";
import {StarRatingComponent} from './star-rating/star-rating.component';
import {MatRadioModule} from "@angular/material/radio";
import {UserSelectionComponent} from './user-selection/user-selection.component';
import {CookieService} from "ngx-cookie-service";
import {MatListModule} from "@angular/material/list";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { UserRateSelectionParentComponent } from './user-rate-selection-parent/user-rate-selection-parent.component';
import { PlanningComponent } from './planning/planning.component';

@NgModule({
  declarations: [
    AppComponent,
    BeerDetailComponent,
    OverviewComponent,
    EstimateAndRateComponent,
    BeerTileComponent,
    StarRatingComponent,
    UserSelectionComponent,
    UserRateSelectionParentComponent,
    PlanningComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule,
    MatCardModule,
    MatDividerModule,
    MatRadioModule,
    MatListModule,
    MatCheckboxModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

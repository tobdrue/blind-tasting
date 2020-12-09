import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OverviewComponent} from './overview/overview.component';
import {BeerDetailComponent} from './beer-detail/beer-detail.component';
import {AlreadyViewedGuard} from './already-viewed.guard';
import {EstimateAndRateComponent} from './estimate-and-rate/estimate-and-rate.component';
import {UserSelectionComponent} from './user-selection/user-selection.component';
import {UserSelectionGuard} from './user-selection.guard';
import {UserRateSelectionParentComponent} from './user-rate-selection-parent/user-rate-selection-parent.component';
import {AnonymousLoginGuard} from "./anonymous-login.guard";


const routes: Routes = [
  {
    path: '', canActivate: [AnonymousLoginGuard], children: [
      {path: 'overview', component: OverviewComponent},
      {path: 'beer', component: BeerDetailComponent, canActivate: [UserSelectionGuard, AlreadyViewedGuard]},
      {
        path: '', component: UserRateSelectionParentComponent, children: [
          {path: 'estimate', component: EstimateAndRateComponent},
          {path: 'user-selection', component: UserSelectionComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

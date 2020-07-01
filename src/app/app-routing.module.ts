import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OverviewComponent} from './overview/overview.component';
import {BeerDetailComponent} from './beer-detail/beer-detail.component';
import {AlreadyViewedGuard} from './already-viewed.guard';
import {EstimateAndRateComponent} from './estimate-and-rate/estimate-and-rate.component';


const routes: Routes = [
  {path: 'overview', component: OverviewComponent},
  {path: 'beer', component: BeerDetailComponent, canActivate: [AlreadyViewedGuard]},
  {path: 'estimate', component: EstimateAndRateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

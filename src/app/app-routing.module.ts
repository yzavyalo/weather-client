import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForecastComponent } from './components/forecast/forecast.component';
import { WikiComponent } from './components/wiki/wiki.component';

const routes: Routes = [
  { path: 'wiki', component: WikiComponent},
  { path: 'forecast', component: ForecastComponent},
  { path: '', redirectTo: '/forecast', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

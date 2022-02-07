import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BundesligaComponent } from './bundesliga/bundesliga.component';

const routes: Routes = [
  {path: 'bundesliga', component: BundesligaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

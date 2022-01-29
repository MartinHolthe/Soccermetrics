import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BundesligaComponent } from './bundesliga/bundesliga.component';
import { RotelleComponent } from './rotelle/rotelle.component';

const routes: Routes = [
  {path: 'bundesliga', component: BundesligaComponent},
  {path: 'rotelle', component: RotelleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BundesligaComponent } from './bundesliga/bundesliga.component';
import { BundesligaService } from './shared/services/bundesliga.service';
import { HttpClientModule } from '@angular/common/http';
import { RotelleComponent } from './rotelle/rotelle.component';



@NgModule({
  declarations: [
    AppComponent,
    BundesligaComponent,
    RotelleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
  
    
  ],
  providers: [BundesligaService],
  bootstrap: [AppComponent]
})
export class AppModule { }

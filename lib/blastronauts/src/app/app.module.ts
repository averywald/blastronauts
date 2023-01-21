import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlackHoleComponent } from './black-hole/black-hole.component';
import { MatterService } from './services/matter.service';

@NgModule({
  declarations: [
    AppComponent,
    BlackHoleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [MatterService],
  bootstrap: [AppComponent]
})
export class AppModule { }

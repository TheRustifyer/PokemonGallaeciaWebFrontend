import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http'

// User Components
import { HeaderComponent } from './design/header/header.component';
import { FooterComponent } from './design/footer/footer.component';
import { TrainersComponent } from './game_components/trainer/trainer.component';
import { TrainerService } from './game_components/trainer/trainer.service';
import { UsersComponent } from './game_components/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TrainersComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    TrainerService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

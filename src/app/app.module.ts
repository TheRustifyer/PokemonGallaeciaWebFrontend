import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import localeES from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

// User Components
import { HeaderComponent } from './design/header/header.component';
import { FooterComponent } from './design/footer/footer.component';
import { PaginatorComponent } from './design/paginator/paginator.component';

import { UsersComponent } from './game_components/users/users.component';
import { UsersFormComponent } from './game_components/users/users.form.component';
import { UserService } from './game_components/users/user.service';

import { TrainersComponent } from './game_components/trainer/trainer.component';
import { TrainerService } from './game_components/trainer/trainer.service';
import { TrainersFormComponent } from './game_components/trainer/trainers.form.component';



// Sets the global locale for the whole app
registerLocaleData(localeES, 'es');

const routes: Routes = [
  {path: '', redirectTo: '/users', pathMatch: 'full'},
  {path: 'users', component: UsersComponent},
  {path: 'users/page/:page', component: UsersComponent},
  {path: 'users/form', component: UsersFormComponent},
  {path: 'users/form/:id', component: UsersFormComponent},
  {path: 'trainers', component: TrainersComponent},
  {path: 'trainers/form', component: TrainersFormComponent},
  {path: 'trainers/form/:id', component: TrainersFormComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    
    HeaderComponent,
    FooterComponent,
    PaginatorComponent,
    
    UsersComponent,
    TrainersComponent,
  
    UsersFormComponent,
    TrainersFormComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    UserService,
    TrainerService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

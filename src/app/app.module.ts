import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RoomListComponent } from './components/room-list/room-list.component';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { RoomDialogComponent } from './components/room-dialog/room-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RoomDetailComponent } from './components/room-detail/room-detail.component';
import { RoomActiveComponent } from './components/room-active/room-active.component';
import { ReservasStudentComponent } from './components/reservas-student/reservas-student.component';
import { ReservasArrenderComponent } from './components/reservas-arrender/reservas-arrender.component';
import { MovimentArrenderComponent } from './components/moviment-arrender/moviment-arrender.component';
import { MovimentStudentComponent } from './components/moviment-student/moviment-student.component';
import { StatisticsArrenderComponent } from './components/statistics-arrender/statistics-arrender.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    RoomListComponent,
    FavoriteListComponent,
    RoomDialogComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    RoomDetailComponent,
    RoomActiveComponent,
    ReservasStudentComponent,
    ReservasArrenderComponent,
    MovimentArrenderComponent,
    MovimentStudentComponent,
    StatisticsArrenderComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

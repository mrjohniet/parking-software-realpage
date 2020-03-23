import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ParkingModuleComponent,AddVehicleDialog } from './home/parking-module/parking-module.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Angular Material
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const material_modules = [
  MatCardModule,
  MatDialogModule,
  MatSelectModule,
  MatFormFieldModule,
  MatInputModule,
  FormsModule,
  ReactiveFormsModule,
  MatButtonModule,
  MatSnackBarModule,
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ParkingModuleComponent,
    AddVehicleDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    material_modules
  ],
  entryComponents:[AddVehicleDialog],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

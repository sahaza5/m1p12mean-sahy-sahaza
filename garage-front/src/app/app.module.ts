
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';



@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthGuard],
})
export class AppModuleModule { }

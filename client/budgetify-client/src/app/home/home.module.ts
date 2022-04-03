import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
];
@NgModule({
  declarations: [HomeComponent, NavbarComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [HomeComponent],
})
export class HomeModule {}

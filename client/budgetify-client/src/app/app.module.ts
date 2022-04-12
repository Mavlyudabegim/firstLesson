import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { MatDialog } from '@angular/material/dialog';
import { HomeRoutingModule } from './home/home-routing.module';
import { CreateAccountComponent } from './home/create-account/create-account.component';
import { EditConfirmationComponent } from './home/dialogs/edit-confirmation/edit-confirmation.component';
import { NavbarModule } from './navbar/navbar.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSliderModule,
    RouterModule,
    AuthModule,
    SharedModule,
    HomeModule,
    NavbarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

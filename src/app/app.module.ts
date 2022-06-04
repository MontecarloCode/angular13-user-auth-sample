import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AboutComponent } from './about/about.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { NavComponent } from './nav/nav.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { MapCardComponent } from './map-card/map-card.component';
import { SquaresComponent } from './_shared/modal/squares/squares.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MainLayoutsComponent } from './_shared/main-layouts/main-layouts.component';
import { DetailsComponentComponent } from './details-component/details-component.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { CardPreloaderComponent } from './card-preloader/card-preloader.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SigninComponent,
    SignupComponent,
    AboutComponent,
    ForgotPasswordComponent,
    EmailVerificationComponent,
    NavComponent,
    LeftSidebarComponent,
    RightSidebarComponent,
    MapCardComponent,
    SquaresComponent,
    UserProfileComponent,
    MainLayoutsComponent,
    DetailsComponentComponent,
    EditProfileComponent,
    TermsOfUseComponent,
    PrivacyPolicyComponent,
    CardPreloaderComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { DetailsComponentComponent } from './details-component/details-component.component';
import { MainLayoutsComponent } from './_shared/main-layouts/main-layouts.component';
import { SquaresComponent } from './_shared/modal/squares/squares.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './_services/auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'about', component: AboutComponent },
  { path: 'privacy', component: PrivacyPolicyComponent },
  { path: 'terms', component: TermsOfUseComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'sq2', component: SquaresComponent, canActivate: [AuthGuard] },
  {
    path: '',
    component: MainLayoutsComponent,
    children: [
      {
        path: '',
        redirectTo: '/',
        pathMatch: 'full',
      },
      { path: '', component: MainComponent, canActivate: [AuthGuard] },
      {
        path: ':id',
        component: DetailsComponentComponent,
        canActivate: [AuthGuard],
      },
      // {
      //   path: 'edit-profile',
      //   redirectTo: 'edit-profile',
      // },
      {
        path: 'e/:id',
        component: EditProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'about/faq',
        component: AboutComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'about/privacy',
        component: PrivacyPolicyComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'about/terms',
        component: TermsOfUseComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'mw/sq2',
        component: SquaresComponent,
        canActivate: [AuthGuard],
      },
      // {
      //   path: 'edit-profile',
      //   redirectTo: 'edit-profile',
      // },
    ],
  },
];
// {
//   path: '',
//   component: MainComponent,
//   pathMatch: 'full',
//   canActivate: [AuthGuard],
// },
// { path: '', redirectTo: 'main', pathMatch: 'full' },
// { path: 'about', component: AboutComponent },
// { path: 'term-of-use', component: TermsOfUseComponent },
// { path: 'privacy-policy', component: PrivacyPolicyComponent },
// { path: 'signin', component: SigninComponent },
// { path: 'signup', component: SignupComponent },
// { path: 'forgot-password', component: ForgotPasswordComponent },
// { path: 'email-verification', component: EmailVerificationComponent },
// { path: 'sq1', component: SituationsComponent, canActivate: [AuthGuard] },
// { path: 'sq2', component: SquaresComponent, canActivate: [AuthGuard] },
// {
//   path: 'profile/:id',
//   component: UserProfileComponent,
//   canActivate: [AuthGuard],
// },
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

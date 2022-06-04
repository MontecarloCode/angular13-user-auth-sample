import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  NgForm,
} from '@angular/forms';
import { User } from '../_services/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  firebaseErrorMessage: string;
  user!: User;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private angularFireAuth: AngularFireAuth
  ) {
    this.isAuthenticate();
    this.signupForm = this.formBuilder.group({
      // fullName: [
      //   '',
      //   [
      //     Validators.required,

      //     Validators.pattern(/^([a-zA-Z'.-]+\s)*[a-zA-Z'.-]+$/),
      //     Validators.maxLength(250),
      //     Validators.minLength(5),
      //   ],
      // ],

      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ],
      ],

      password: ['', [Validators.required, Validators.minLength(6)]],
      acceptTerms: [false, Validators.requiredTrue],
    });
  }

  ngOnInit(): void {}
  onSubmit() {
    if (this.signupForm.invalid) return; // if signupForm isn't valid, don't submit it.
    this.user = this.signupForm.value;
    this.authService.createNewUser(this.user).then((result) => {
      if (result == null) this.router.navigate(['/']);
      // null is success, false means there was an error
      else if (result.isValid == false)
        this.firebaseErrorMessage = result.message;
    });
  }

  isAuthenticate() {
    this.angularFireAuth.onAuthStateChanged((user) => {
      user ? this.router.navigate(['/']) : null;
    });
  }
}

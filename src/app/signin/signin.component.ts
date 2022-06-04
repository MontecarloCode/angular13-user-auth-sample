import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  firebaseErrorMessage: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private angularFireAuth: AngularFireAuth
  ) {
    this.isAuthenticate();
    this.loginForm = this.formBuilder.group({
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
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.loginForm.invalid) return; // if loginForm isn't valid, do not submit it.
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    this.authService.loginUser(email, password).then((result) => {
      if (result == null) this.router.navigate(['/']);
      // null is success.
      else if (result.isValid == false){
        this.firebaseErrorMessage = result.message;
      }
    });
  }

  isAuthenticate() {
    this.angularFireAuth.onAuthStateChanged((user) => {
      user ? this.router.navigate(['/']) : null;
    });
  }
}

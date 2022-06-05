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
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgot_passForm: FormGroup;
  firebaseErrorMessage!: string;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private angularFireAuth: AngularFireAuth
  ) {
    this.forgot_passForm = this.formBuilder.group({
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
    });
  }

  ngOnInit(): void {}
  onSubmit() {
    if (this.forgot_passForm.invalid) return; // if loginForm isn't valid, do not submit it.
    let email = this.forgot_passForm.value.email;
    // let password = this.loginForm.value.password;
    this.authService.resetPassword(email).then((result) => {
      if (result == null) this.router.navigate(['/signin']);
      // null is success.
      else if (result.isValid == false)
        this.firebaseErrorMessage = result.message;
    });
  }
}

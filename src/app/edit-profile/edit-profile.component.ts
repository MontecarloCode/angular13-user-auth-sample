import { AuthService } from 'src/app/_services/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  AngularFirestore,
  DocumentSnapshot,
} from '@angular/fire/compat/firestore';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Location } from '@angular/common';
import { User } from 'src/app/_services/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  dob_year: any;
  dob_month: any;
  dob_day: any;
  user: User = {} as User;
  id!: string;
  acceptDelAccount: FormGroup;
  updateInfosForm!: FormGroup;
  updateInfos: boolean = false;
  fileUrl!: Observable<string>;
  fileUploaded: boolean;
  fileIsUploading: boolean;
  persentage!: any;
  role!: string;
  roleSelected!: string;
  aliasUrl!: string;
  lastSession!: string;
  created_at: any = {};
  constructor(
    private angularFireStorage: AngularFireStorage,
    private angularFirestore: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.fileIsUploading = false;
    this.fileUploaded = false;
    this.acceptDelAccount = this.formBuilder.group({
      acceptDelAccount: [false, Validators.requiredTrue],
    });
  }

  ngOnInit(): void {
    this.getUser();
  }
  deleteAccount() {
    this.authService.deleteUser();
  }
  getUser() {
    this.user.uid = this.route.snapshot.params['id'];
    this.angularFireAuth.onAuthStateChanged((user: any) => {
      // if (usr) {
      // this.user.uid = this.route.snapshot.params['id'];
      this.angularFirestore
        .collection('users')
        .doc(user.uid)
        .valueChanges()
        .subscribe((res: any) => {
          this.user = res;
          // this.role = res.role;
          console.log('---->', res.role);
          // console.log('typeoff date: ', this.user.created_at);
          // console.log('---->', this.user.role);
        });
      // user.uid = this.route.snapshot.params['id'];
      console.log('user.uid: ', user.uid);
      // }
    });
  }
  goToEditUserProfile() {
    this.router.navigate([this.user.aliasUrl], {
      skipLocationChange: true,
    });
  }
}

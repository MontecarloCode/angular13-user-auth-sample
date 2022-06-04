import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  AngularFirestore,
  DocumentSnapshot,
} from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'src/app/_services/user';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss'],
})
export class LeftSidebarComponent implements OnInit {
  id!: string;
  user: User = {} as User;
  constructor(
    private router: Router,
    private authService: AuthService,
    private angularFirestore: AngularFirestore,
    public angularFireAuth: AngularFireAuth,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this.user.aliasUrl = this.route.snapshot.params['id'];
    this.angularFireAuth.onAuthStateChanged((user: any) => {
      this.angularFirestore
        .collection('users')
        .doc(user.uid)
        .valueChanges()
        .subscribe((res: any) => {
          this.user = res;
        });
    });
  }
  goToUserProfile() {
    this.router.navigate([this.user.aliasUrl]);
    // console.log('======= ', this.user.aliasUrl);
  }
  goToEditUserProfile() {
    this.router.navigate(['e/', this.user.aliasUrl], {
      skipLocationChange: true,
    });
  }
}

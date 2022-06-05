import { Component, Injectable, OnInit } from '@angular/core';
import { TimerDisabledService } from '../_services/timer-disabled.service';
import { AuthService } from '../_services/auth.service';
import { Subscription, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from 'src/app/_services/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  DocumentSnapshot,
} from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
@Injectable({
  providedIn: 'root',
})
export class NavComponent {
  modal = false;
  modalSquares = false;
  check = sessionStorage.getItem('button');
  bthIsView = true;
  user: User = {} as User;
  lstTimeIn!: string;
  lstTimeCons!: string;
  countTime!: number;
  constructor(
    private router: Router,
    public appTimerDelayServices: TimerDisabledService,
    public authService: AuthService,
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore
  ) {
    this.testOutPutTimeConsructor();
  }

  // ngOnInit() : void {
    // this.testOutPutTimengOnInit();
    // console.log('appTimerDelayServices---> ', this.appTimerDelayServices.time);
    // if (+this.check === 1) {
    //   this.bthIsView = true;
    // } else this.bthIsView = false;
  // }

  logOut = () => this.authService.logoutUser();
  // logOut = () => this.authService.logout();
  sq1() {
    this.router.navigate(['mw/sq2'], {
      skipLocationChange: true,
    });
  }
  testOutPutTimengOnInit() {
    // this.lstTimeIn = 'last seesion on Init';
    return this.angularFireAuth.onAuthStateChanged((user: any) => {
      // if (usr) {
      // this.user.uid = this.route.snapshot.params['id'];
      this.angularFirestore
        .collection('session')
        .doc(user.uid)
        .valueChanges()
        .subscribe((res: any) => {
          this.user = res;
          // this.role = res.role;
          // console.log('get session', res.lastSession);
          this.lstTimeIn = res.lastSession;
          // console.log('typeoff date: ', this.user.created_at);
          // console.log('---->', this.user.role);
        });
      // user.uid = this.route.snapshot.params['id'];
      // console.log('user.uid: ', user.uid);
      // }
    });
  }
  testOutPutTimeConsructor() {
    this.lstTimeCons = 'last seesion on Conctructor';
  }
}

import { EmailVerificationComponent } from './../email-verification/email-verification.component';
import { User } from '../_services/user';
import { Injectable, enableProdMode } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userEmail!: string;
  userID!: string;
  userRole!: string;
  currentUser!: any;
  role!: string;
  emailVerified!: boolean;
  registerDate = Date.now();
  loggedIn: boolean = false;
  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage,
    public afAuth: AngularFireAuth
  ) {
    this.getUser();
    this.angularFireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.angularFirestore
          .collection('users')
          .doc(user.uid)
          .valueChanges()
          .subscribe((result: any) => {
            this.role = result.role;
          });
      }
    });
  }
  getUser() {
    return this.angularFireAuth.onAuthStateChanged((usr: any) => {
      if (usr) {
        this.userEmail = usr.email;
        this.userID = usr.uid;
        this.angularFirestore
          .collection('users')
          .doc(usr.uid)
          .valueChanges()
          .subscribe((res) => (this.currentUser = res));
        console.log('email verificated: ', usr.emailVerified);
      } else {
      }
    });
  }
  async createNewUser(user: User): Promise<any> {
    return await this.angularFireAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((result: any) => {
        result.user.sendEmailVerification();
        user.password = '';
        // user.uid = result.user.uid;
        user.role = 'curious';
        user.aliasUrl = this.angularFirestore.createId();
        // user.emailVerified = user.emailVerified;
        user.lastSession = '89153945000';
        user.fullName = null;
        user.preferredName = null;
        user.nickName = null;
        user.created_at = this.registerDate.toString();
        user.imageURL = '../../assets/default_avatar.png';
        console.log('User uid ---> ', result.user.uid);
        this.angularFirestore.doc('/users/' + result.user.uid).set(user);
        // var currentTimeInSeconds = Math.floor(Date.now());
        // this.angularFirestore.doc('/session/' + result.user.uid).set({
        //   lastSession: '89150399',
        //   // currentTimeInSecondsRegister: currentTimeInSeconds.toString(),
        //   // reservOne: null,
        //   // reservTwo: null,
        // });
      })
      .catch((error): any => {
        console.log('Auth Service: signup error', error);
        if (error.code)
          return {
            isValid: false,
            message: error.message,
          };
      });
  }

  async loginUser(email: string, password: string): Promise<any> {
    return await this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Auth Service: loginUser: success');
        this.router.navigate(['/']);
      })
      .catch((error): any => {
        console.log('Auth Service: login error...');
        console.log('error code', error.code);
        console.log('error', error);
        if (error.code) return { isValid: false, message: error.message };
      });
  }

  async resetPassword(email: string): Promise<any> {
    return await this.angularFireAuth
      .sendPasswordResetEmail(email)
      .then(() => console.log('Auth Service: reset password success'))
      .catch((error) => {
        console.log('Reset password error :');
        console.log(error.code);
        console.log(error);
        if (error.code) return error;
      });
  }

  async resendVerificationEmail() {
    return this.afAuth.currentUser
      .then((u) => u!.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email']);
      });
    // verification email is sent in the Sign Up function, but if you need to resend, call this function
    // return (await this.afAuth.currentUser)
    //   .sendEmailVerification()
    //   .then(() => {
    //     // this.router.navigate(['/home']);
    //   })
    //   .catch((error) => {
    //     console.log('Auth Service: sendVerificationEmail error...');
    //     console.log('error code', error.code);
    //     console.log('error', error);
    //     if (error.code) return error;
    //   });
  }

  async logoutUser(): Promise<void> {
    return await this.angularFireAuth
      .signOut()
      .then(() => localStorage.clear())
      .then(() => sessionStorage.clear())
      .then(() => this.router.navigate(['/signin'])) // when we log the user out, navigate them to home
      .catch((error) => {
        console.log('Auth Service: logout error...');
        console.log('error code', error.code);
        console.log('error', error);
        if (error.code) return error;
      });
  }
  // logout() {
  //   console.log('LOGOUT');
  //   this.angularFireAuth.signOut();
  //   this.router.navigateByUrl('/signin');
  // }

  // запись времени удаления аккаунта
  setUserDeleteTime() {
    const sesionRef: AngularFirestoreDocument<any> = this.angularFirestore.doc(
      `deletedUsers/${this.userID}/`
    );
    var currentTimeInSeconds = Math.floor(Date.now());
    sessionStorage.setItem('LastTime', currentTimeInSeconds.toString());
    const sesRef = {
      lastSession: currentTimeInSeconds,
      // testStringOne: 'One',
    };
    return sesionRef.set(sesRef, {
      merge: true,
    });
  }
  // this methode will delete the current user that is signed in
  deleteUser() {
    this.setUserDeleteTime();
    console.log('click delete user--->', this.userID);

    this.angularFireAuth.currentUser.then((usr: any) => {
      let uid = usr?.uid;
      console.log(uid);

      this.angularFirestore
        .collection('users')
        .doc(uid)
        .valueChanges()
        .subscribe((result: any) => {
          let imgURL = result.imageURL;
          let picPath = imgURL.slice(0, 12);
          if (picPath !== '../../assets') {
            console.log('не стандартная аватарка');
            this.angularFireStorage.storage
              .refFromURL(imgURL)
              .delete()
              .then(() =>
                this.angularFirestore
                  .collection('users')
                  .doc(uid)
                  .delete()

                  .then(() => usr?.delete())
                  .then(() => localStorage.clear())
                  .then(() => sessionStorage.clear())
                  .then(() => this.router.navigate(['/signin']))
                  .catch((error) => {
                    console.log('Auth Service: delete error...');
                    console.log('delete error code', error.code);
                    console.log('delete error', error);
                    if (error.code) return error;
                  })
              );
          } else {
            console.log('стандартная аватарка');
            this.angularFirestore

              .collection('users')
              .doc(uid)

              .delete()

              .then(() => usr?.delete())

              .then(() => this.router.navigate(['/signin']));
          }
        });
    });
  }

  deleteSpecificUser(id: string) {}

  getUsersList = () =>
    this.angularFirestore.collection('users').snapshotChanges();

  checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false;
    // for (const role of allowedRoles) {
    //   if (user.role === role) return true;
    // }
    return false;
  }

  // canRead(user: User): boolean {
  //   const allowed = ['admin', 'editor', 'analyst', 'subscriber'];
  //   return this.checkAuthorization(user, allowed);
  // }

  // canEdit(user: User): boolean {
  //   const allowed = ['admin', 'editor'];
  //   return this.checkAuthorization(user, allowed);
  // }

  // canDelete(user: User): boolean {
  //   const allowed = ['admin'];
  //   return this.checkAuthorization(user, allowed);
  // }

  isAdmin(): boolean {
    if (this.role === 'admin') return true;
    else return false;
  }
}

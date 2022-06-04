import { Injectable } from '@angular/core';
import { Cargo, User } from './user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetResultsService {
  cargo: Cargo = {} as Cargo;
  user: User = {} as User;
  UsrId: string;
  emotion: string;
  public isLoading$: Observable<Boolean> = of(false);
  public data$: Observable<any>;
  public error$: Observable<any>;

  constructor(private db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.afAuth.currentUser.then((usr: any) => {
      this.UsrId = usr?.uid;
      // console.log(uid);
      // console.log(this.userAuth.uid);
    });
  }
}

import { Cargo } from './../../../_services/user';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TimerDisabledService } from 'src/app/_services/timer-disabled.service';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { NetService } from './../../../_services/net.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Session {
  setTime: string;
}

@Component({
  selector: 'app-squares',
  templateUrl: './squares.component.html',
  styleUrls: ['./squares.component.scss'],
})
export class SquaresComponent implements OnInit {
  @Output() squaresClose = new EventEmitter<void>();
  cargo: Cargo = {} as Cargo;
  sqList = [
    { id: 0, enable: true, color: 'sq-0' },
    { id: 1, enable: true, color: 'sq-1' },
    { id: 2, enable: true, color: 'sq-2' },
    { id: 3, enable: true, color: 'sq-3' },
    { id: 4, enable: true, color: 'sq-4' },
    { id: 5, enable: true, color: 'sq-5' },
    { id: 6, enable: true, color: 'sq-6' },
    { id: 7, enable: true, color: 'sq-7' },
    { id: 8, enable: true, color: 'sq-8' },
  ];
  squers: any[] = [];
  indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  testResults: String = '';
  leftColor = 9;
  remainderColors = 8;
  viewSq = true;
  resArray: number[] = [];
  userAuth: any;
  UsrId!: string;
  ot: any;
  ResultDB: any;
  tT!: number;

  // cloud function ih8ers
  // private url =
  //   'https://us-central1-ipadress-59685.cloudfunctions.net/LocationData';
  constructor(
    private netService: NetService,
    private db: AngularFireDatabase,
    public appTimerDelayServices: TimerDisabledService,
    private router: Router,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    private http: HttpClient
  ) {
    this.afAuth.authState.subscribe((user) => {
      this.userAuth = user;
      this.UsrId = this.userAuth.multiFactor.user.uid;
    });
  }

  ngOnInit() {
    var currentTimeInSeconds = Math.floor(Date.now());
    localStorage.setItem('selTesec', currentTimeInSeconds.toString());

    let count = this.indexes.length;
    for (let i = count; i > 0; i--) {
      let index = Math.floor(i * Math.random());
      this.squers[count - i] = this.sqList[this.indexes[index]];
      this.indexes.splice(index, 1);
    }
  }
  results(item: any): void {
    this.testResults += item.id;

    item.color = 'sq-empty';
    this.leftColor--;
    this.remainderColors--;
    item.enable = false;
    let res: number[] = this.resArray;
    res.push(item.id); //добавляем id цвета в массив

    if (this.leftColor === 1) {
      let lastSquare = this.squers.filter((user) => user.color !== 'sq-empty');

      let lastSq = lastSquare[0].id;
      this.ot = lastSq.toString();

      this.appTimerDelayServices.testTimer();

      this.tT = Math.floor(Date.now());
      // время с чего начинается отчет включения кнопки
      let currentTimeInSeconds = Math.floor(Date.now());

      this.setUserSession();
      let t_tmp = localStorage.getItem('selTesec');
      if(t_tmp){
        let resT: number = +t_tmp;
        let resChange = (currentTimeInSeconds - resT) / 1000;
        localStorage.setItem('rapidAssessment', resChange.toString());
      }
      this.router.navigate(['']);
    }
  }
  setUserSession() {
    const sesionRef: AngularFirestoreDocument<any> = this.afs.doc(
      `session/${this.UsrId}/`
    );

    const sesRef = {
      lastSession: this.tT,
    };
    return sesionRef.set(sesRef, {
      merge: true,
    });
  }
}

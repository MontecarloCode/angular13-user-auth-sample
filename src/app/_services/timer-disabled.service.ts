import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { Observable, Subscription, timer } from 'rxjs';

import { finalize, map, share, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TimerDisabledService {
  viewButton = true;
  check = sessionStorage.getItem('button');
  now_time = new Date().getTime();
  add_time = localStorage.setItem('addTime', new Date().getTime().toString());
  session_time = localStorage.getItem('addTime');
  end_time = new Date().getTime() + 10000;
  // mls_time = 60 * 1.5 * 1000;
  mls_time = 10000;
  res_time: number;
  time: number;
  timeS: number;

  timer$: Observable<number>;
  timerSub: Subscription;
  // set_interval = now;
  time$;
  constructor() {
    this.time = Math.ceil(
      (this.now_time + this.mls_time - +this.session_time) / 1000
    );
    // переменная видна везде, открыт доступ любому компоненту
    this.timeS;
  }
  // startTimer() {
  //   if (+this.check == 1) {
  //     // this.removeButton();
  //     this.viewButton = true;
  //   } else this.viewButton = false;
  // }
  removeButton() {
    var date = Date.now() / 1000;
    // sessionStorage.removeItem('flag');
    // sessionStorage.setItem('button', '0');
    // var check = sessionStorage.getItem('button');

    // повторить с интервалом 1 секунду

    this.viewButton = false;

    console.log('button is hide! ', this.check);
    // sessionStorage.setItem('button', 'hide');
    // console.log('click-time: ', date, ' real-time: ', Date.now() / 1000);
    // let timerId = setInterval(
    //   () => (
    //     sessionStorage.setItem('flag', 'ok'), this.testFunc()
    //     // console.log('click-time: ', date, ' real-time: ', Date.now() / 1000),
    //     // console.log('jjj')
    //   ),

    //   1000
    // );
    // остановить вывод через 10 секунд, одна секунда - 1000
    setTimeout(() => {
      this.res_time = this.end_time - this.now_time;
      // clearInterval(timerId);
      // sessionStorage.removeItem('flag');
      // sessionStorage.setItem('button', '1');
      var now = new Date().getTime();
      var ten_second = 10000;
      var interval = now + ten_second;
      var newDate = new Date();
      var temp = +this.add_time;

      // прибавляем 10 секунд
      // var seconds = 1000;
      // var minuts = 60000;
      // var difOneSecond = now - minuts;
      // 60 * 1 * 1000 - это одна минута

      console.log(
        '| время отчета: ',
        +this.session_time,
        '| заданное время включения: ',
        this.end_time,
        '| интервал(млСек): ',
        this.end_time - +this.session_time
      );
      // this.testTimer();
      // начало вывода время в реал-тайм
      // this.time$ = Observable.interval(1000).map(() => new Date().getTime()/ 1000)
      // this.time$ = Observable.interval(1000).map(() =>
      //   Math.floor(new Date().getTime() / 1000)
      // );
      // конец
      // console.log('время сейчас --->', now);
      // console.log('new Date() ', newDate);
      // console.log('different in one minuts: ', difOneSecond);
      // console.log('открылась кнопка');
      this.viewButton = true;
    }, this.end_time - +this.session_time);
  }
  testTimer_v1() {
    var duration = 5;
    interval(1000)
      .pipe(
        take(duration),
        map((count) => duration - count)
      )
      .subscribe((seconds) => {
        this.removeButton();
        console.log('--------> ', seconds);
      });

    // interval(1000)
    //   .pipe(map(() => Math.floor(new Date().getTime() / 1000)))
    //   .subscribe((val) => {
    //     console.log('--------> ', val);
    //   });
  }
  testTimer() {
    this.viewButton = false;

    console.log('%c Button is false ', 'background: #000; color: #fff');

    console.log(
      '| getItem ',
      +this.session_time,
      '| now_time: ',
      this.now_time,

      '| разница между localStorage  и временем+10 секунд(млСек): ',
      this.now_time + this.mls_time - +this.session_time
    );
    // this.time = Math.ceil(
    //   (this.now_time + this.mls_time - +this.session_time) / 1000
    // );
    console.log('this.time ---> ', this.time);

    this.timerSub && this.timerSub.unsubscribe();
    this.timer$ = timer(0, 1000).pipe(
      map((i) => {
        console.log(this.time - i);
        this.timeS = this.time - i;
        return this.time - i;
      }),
      take(this.time + 1),
      finalize(
        () => (
          (this.viewButton = true),
          console.log('%c Button is true', 'background: #00ff00; color:#000 ')
        )
        // console.log('DONE')
      ),
      share()
    );

    this.timerSub = this.timer$.subscribe();
  }
}

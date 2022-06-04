import { GetResultsService } from './../_services/get-results.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(public getRes: GetResultsService) {}

  ngOnInit(): void {}
}

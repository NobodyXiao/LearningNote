import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../account.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-count-month',
  templateUrl: './count-month.component.html',
  styleUrls: ['./count-month.component.css']
})

export class CountMonthComponent implements OnInit {
  scrollHeight;
  a=[];
  constructor(private service: AccountService) {
    this.a = service.countData;
    this.scrollHeight={
      'height': window.screen.height - 190 + 'px',
      'margin-top':57+ 'px'
    };
   }

  ngOnInit() {
  }

}



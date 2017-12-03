import { Component, OnInit } from '@angular/core';
import {AccountService} from '../account.service';

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.css']
})
export class CountComponent implements OnInit {
  activeIndex = 0; // 当前激活标记

  constructor(private service: AccountService) {

  }


  ngOnInit() {
  }
  setActive(i) { // 设置标记
    this.activeIndex = i;
  }
}

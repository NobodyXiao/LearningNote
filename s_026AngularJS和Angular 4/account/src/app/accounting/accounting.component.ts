import { Component, OnInit } from '@angular/core';
import {AccountService} from '../account.service';
import { NgModule } from '@angular/core';
import {BillType} from '../Model/model.billType';
import {WeUITopTips} from 'angular-weui';
import * as $ from 'jquery';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/primeng';
import { NgModel } from '@angular/forms';

@NgModule({
  providers: [
    AccountService
  ],
  imports: [
    CalendarModule,
    BrowserAnimationsModule
  ]
})

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.css'],
})

export class AccountingComponent implements OnInit {


  TopTip: WeUITopTips;
  toastText= '';
  money = ''; // 金额
  // billTypes=[]; // 记账类型,在使用http请求的时候会用到
  countData=[];// 消费数据
  temCountData=[];
  billTypes=[{"name":"食物","fontStyle":"fa-cutlery","id":1},{"name":"旅游","fontStyle":"fa-plane","id":2},{"name":"住房","fontStyle":"fa-university","id":3},{"name":"通讯","fontStyle":"fa-address-book-o","id":4},{"name":"学习","fontStyle":"fa-book","id":5},{"name":"出行","fontStyle":"fa-taxi","id":6},{"name":"医疗","fontStyle":"fa-medkit","id":7},{"name":"购物","fontStyle":"fa-shopping-bag","id":8},{"name":"娱乐","fontStyle":"fa-music","id":9}];
  contentStyle = {   // 绑定的样式
    'overflow': 'scroll',
    'height': window.screen.availHeight - 145 + 'px'
  };


  constructor(private service: AccountService) {
      // service.getBillTypes().then(r => {
      //   return this.billTypes = r.result;
      // }).catch(r => this.alert( '服务器无法连接'));
      // 向服务器请求数据
 }

  ngOnInit() {}

  /// 自己封装的消息提示
  private alert(msg) {
    this.toastText = msg;
  }
}
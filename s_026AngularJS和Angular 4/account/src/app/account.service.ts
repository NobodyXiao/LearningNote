import { Injectable } from '@angular/core';
import { Urls } from './model/model.url';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Result } from './Model/model.result';
import { Input } from './Model/model.input';
import * as $ from 'jquery';
import 'rxjs/Rx';

@Injectable()
export class AccountService {
  currentTime = new Date();
  currentYear = this.currentTime.getFullYear();
  currentMonth = this.currentTime.getMonth() + 1;
  currentDay = this.currentTime.getDate();
  timeFormt = function(year,month,day){
    if(month<10){
      month=`0${month}`;
    }
    if(day<10){
      day=`0${day}`;
    }
    return `${year}-${month}-${day}`
  }
  actualTime = this.timeFormt(this.currentYear,this.currentMonth,this.currentDay);

  money = '';
  countData = [];// 消费数据
  temCountData = [];
  private urls = Urls;
  constructor(private http: Http) { }
  private count = [];
  allMoney = 0;
  // 用来做图标的数据
  monthCount = [];
  actMonth = [];
  yy;
  getBillTypes() { // 获取记账类型
    console.log(this.get(this.urls.GetBillTypes).then(r => {
      console.log(r.result);
    }));
    return this.get(this.urls.GetBillTypes);
  }

  // 添加一个临时数组
  add(a, id: number) {
    // var Countdate;
    var Countitem = '';
    var Countmoney = this.money;

    if (this.money === '') {
      alert('请先输入金额，再选择去向');
      return;
    } else {
      var node = a.toElement.nodeName
      if (node == "I") {
        Countitem = $(a.target).parent().siblings().html();
      } else if (node == "A") {
        Countitem = $(a.target).children('p').html();
      } else if (node == "P") {
        Countitem = $(a.target).html();
      } else {
        Countitem = $(a.target).siblings().html();
      }


      //  点击单个项目的时候给a的样式上加上背景
      if (node == "I") {
        $(a.target).parent().parent().siblings().removeClass("choosed");
        $(a.target).parent().parent().addClass("choosed");
      } else if (node == "A") {
        $(a.target).siblings().removeClass("choosed");
        $(a.target).addClass("choosed");
      } else if (node == "P") {
        $(a.target).parent().siblings().removeClass("choosed");
        $(a.target).parent().addClass("choosed");
      } else {
        $(a.target).parent().siblings().removeClass("choosed");
        $(a.target).parent().addClass("choosed");
      }
    }
    this.temCountData.push({ "item": Countitem });
  }

  //  通过控制数据，删除DOM
  delete(event, deleteNum) {
    this.countData.splice(deleteNum, 1);
    this.allMoney = 0;
    for (var i = 0, len = this.countData.length; i < len; i++) {
      this.allMoney += Number(this.countData[i].money);
    }
    return this.countData;
  }

  // 点击项目和金额，添加DOM
  addCountRecord($event) {
    if (this.money === '') {
      alert('请先输入金额，再选择去向');
      return;
    } else {
      // 点击添加按钮的时候，重新检查一下money，看看最后的金额有没有更改
      this.temCountData[this.temCountData.length - 1].money = this.money;
      this.temCountData[this.temCountData.length - 1].date = this.actualTime;
      this.countData.push(this.temCountData[this.temCountData.length - 1]);
      this.allMoney = 0;
      for (var i = 0, len = this.countData.length; i < len; i++) {
        this.allMoney += Number(this.countData[i].money);
      }
      // 点击加入按钮之后，把输入框清空，并同时改变各个项目的样式

      this.money = '';
      var itemBlock = $($event.target).siblings().find('a');
      for (var j = 0; j < itemBlock.length; j++) {
        $(itemBlock[j]).removeClass("choosed");
      }
    }
  }


  //  为图标制作处理数据
  collect() {
    var months = [];
    for (var k = 0; k < this.countData.length; k++) {
      months.push(this.countData[k].date.slice(5, 7) + "月");
    }
    // 数组去重获得月份
    this.actMonth = [];
    for (var m = 0; m < months.length; m++) {
      if (this.actMonth.indexOf(months[m]) == -1) {
        this.actMonth.push(months[m]);
        this.actMonth.sort();
      }

    }
    // 获取每月花钱的数量
    this.monthCount = [];
    for (var n = 0; n < this.actMonth.length; n++) {
      var tempMoney = 0;
      var num = this.actMonth[n].slice(0, 2);
      for (var q = 0; q < this.countData.length; q++) {
        if (this.countData[q].date.slice(5, 7) == num) {
          tempMoney += Number(this.countData[q].money);
        }
      }
      this.monthCount.push(tempMoney);
    }
  }




  GetBills(date, skipCount, user): Promise<Result> {
    const d = new URLSearchParams();
    d.set('date', date);
    d.set('skipCount', skipCount);
    d.set('user', user);
    return this.get(this.urls.GetBills, d);
  }

  GetCount(date: string, type: number, user: string, GroupBy = 0): Promise<Result> {
    const d = new URLSearchParams();
    d.set('date', date);
    d.set('type', type.toString());
    d.set('user', user);
    d.set('GroupBy', GroupBy.toString());
    return this.get(this.urls.GetCount, d);
  }
  GetTotallCount(user): Promise<Result> {
    return this.get(this.urls.GetTotallCount + '?user=' + user);
  }
  AddBills(data) {
    this.count.push(data);
  }
  DeleteBill(data: number): Promise<Result> {
    return this.post(this.urls.DeleteBill, data);
  }
  // 对get请求进行封装
  private get(url: string, data: URLSearchParams = null): Promise<Result> {
    return this.http.get(url, { search: data })
      .toPromise().then(r => r.json() as Result)
      .catch(this.handleError);
  }
  // 对post请求进行封装
  private post(url: string, data: any): Promise<Result> {
    return this.http.post(url, data)
      .toPromise().then(r => r.json() as Result)
      .catch(this.handleError);
  }
  // 捕获异常并输出
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

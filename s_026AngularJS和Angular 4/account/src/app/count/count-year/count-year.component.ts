import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts-ng2';
import {AccountService} from '../../account.service';

@Component({
  selector: 'app-count-year',
  templateUrl: './count-year.component.html',
  styleUrls: ['./count-year.component.css']
})
export class CountYearComponent implements OnInit {
  
  contentStyle = {   // 绑定的样式
    'overflow': 'scroll',
    'height': window.screen.availHeight - 145 + 'px',
    'display':'none'
  };
  picMonth =[];
  picMoney = [];
    // 参考官网的配置项
    lineOption: EChartOption ;
    constructor(private service: AccountService) {
      this.picMonth = service.actMonth;
      this.picMoney = service.monthCount;     
      if(this.picMoney.length !=0){
        this.contentStyle.display="block";
      }  
      // 获取全年的总共的数据，按照每个类目划分
      // 首先得到消费数据中的月份统计，其余是每个月的金额统计，

    }
  
    ngOnInit() {
      // this.picMonth=['周一','周二','周三','周四','周五','周六','周日'];
      this.lineOption = this.createLine(this.picMonth, this.picMoney, '');
    }
  // 画折线图
  private createLine(xx, yy, title: string): EChartOption {
    return {
      title: {
        text: title,
        subtext: '单位（元）',
        x:"right"
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
      },
      },
      grid: {x: 36, y: 30, x2: 10, y2: 30, borderWidth: 0},
      xAxis: [
        {
          type: 'category',
          data:  xx,
          show: true,
        }
      ],
      yAxis: [
        {
          show: true,
          type: 'value',
          splitNumber:5,
          min: 0.5*Math.min.apply(null, yy),
          max: 1.5*Math.max.apply(null, yy)
        }
      ],
      series: [
        {
          name: '消费',
          type: 'line',
          center: ['1', '1'],
          smooth: true,
          itemStyle: {normal: {label: {show: true}}},
          data: yy
        },
      ]
    };
  }
  }

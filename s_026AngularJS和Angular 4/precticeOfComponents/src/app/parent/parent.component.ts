import {ViewChild, Component, OnInit } from '@angular/core';
// 4.父组件获得子组件实例,通过引入子组件和ViewChild装饰器
// import{ChildComponent}from '../child/child.component';
// 5.使用EventEmitter
import{myService}from '../app.service'
@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {


  // 2.子组件向父组件通信
  // i: number = 0;
  // numberIChange(i:number){
  //   this.i = i;
  // }

  // 3.子组件获取父组件实例
  // i:number = 0;
  // 4.父组件获得子组件实例
  // @ViewChild(ChildComponent) child:ChildComponent;
  // ngAfterViewInit() {
  //     setInterval(()=> {
  //         this.child.i++;
  //     }, 1000)
  // }
  // 5.使用EventEmitter
  i:number = 0;
  constructor(service:myService) {
    setInterval(()=> {
      service.change.emit(++this.i);
  }, 1000)
   }
  ngOnInit() {

  }
}

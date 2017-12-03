import { Component, OnInit ,Input,EventEmitter, Output,Host,Inject,forwardRef} from '@angular/core';
// 3.子组件获取父组件实例,引入父组件和Host,Inject,forwardRef装饰器
// import{ParentComponent} from '../parent/parent.component';
// 5.使用EventEmitter
import{myService}from "../app.service"

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  //1. @Input() content:string;父组件向子组件传递参数
  // 2.子组件向父组件通信
  // @Output() change: EventEmitter<number> = new EventEmitter();

  // constructor( @Host() @Inject(forwardRef(() => ParentComponent)) app: ParentComponent) { 
  //   // 2.子组件向父组件通信
  //   // setInterval(() => {
  //   //   this.change.emit();
  //   // }, 1000)
  //   // 3.子组件获取父组件实例
  //   setInterval(() => {
  //     app.i++;
  // }, 1000);
  // }
  // Number: number = 0;
  i:number = 0;
  constructor(public service:myService){
    service.change.subscribe((value:number)=>{
      this.i = value;
  })
  }
  ngOnInit() {
  }

}

import {Component,Injectable,EventEmitter} from '@angular/core';
@Injectable()
export class myService {
    change: EventEmitter<number>;

    constructor(){
        this.change = new EventEmitter();
    }
}
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { EchartsNg2Module } from 'echarts-ng2';
import {AccountService} from './account.service';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AccountingComponent } from './accounting/accounting.component';
import { CountComponent } from './count/count.component';
import { CountYearComponent } from './count/count-year/count-year.component';
import { CountMonthComponent } from './count/count-month/count-month.component';
import { WeUIModule } from 'angular-weui';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: "account",
    pathMatch: "full"
  },
  {
    path: 'count', component: CountComponent, children: [
      { path: '', component: CountMonthComponent },
      { path: 'year', component: CountYearComponent }
    ]
  },
  {
    path: "account",
    component: AccountingComponent
  }
];  

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AccountingComponent,
    CountComponent,
    CountYearComponent,
    CountMonthComponent,
  ],
  imports: [
    BrowserModule,
    WeUIModule,
    FormsModule,
    RouterModule.forRoot(ROUTES),
    EchartsNg2Module,
    HttpModule
  ],
  providers: [AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }

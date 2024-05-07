import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http'; // HttpClientModule import edildi

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { FooterComponent } from './dashboard/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShelfComponent } from './content/shelf/shelf.component';
import { StockalertComponent } from './content/stockalert/stockalert.component';
import { StockComponent } from './content/stock/stock.component';
import { EmployeeComponent } from './content/employee/employee.component';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { TypeComponent } from './content/type/type.component';
import { requestInterceptor } from './interceptor/request.interceptor';
import { ChartComponent } from './content/chart/chart.component';
import { ChartModule } from 'angular-highcharts';





@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    ChartComponent,
    FooterComponent,        
    LoginComponent,
    ShelfComponent,
    StockalertComponent,
    StockComponent,
    EmployeeComponent,    
    TypeComponent, 
    ChartComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule, // HttpClientModule AppModule içinde imports dizisine eklendi
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    ChartModule
  ],
  providers: [
    provideHttpClient(withInterceptors([requestInterceptor])),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

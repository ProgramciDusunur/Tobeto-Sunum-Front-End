import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // HttpClientModule import edildi

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { FooterComponent } from './dashboard/footer/footer.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { HomeComponent } from './content/home/home.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShelfComponent } from './content/shelf/shelf.component';
import { StockalertComponent } from './content/stockalert/stockalert.component';
import { StockComponent } from './content/stock/stock.component';
import { EmployeeComponent } from './content/employee/employee.component';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProductComponent } from './content/product/product.component';
import { TypeComponent } from './content/type/type.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent,
    LoginComponent,
    ShelfComponent,
    StockalertComponent,
    StockComponent,
    EmployeeComponent,

    ProductComponent,
      TypeComponent    

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule, // HttpClientModule AppModule içinde imports dizisine eklendi
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

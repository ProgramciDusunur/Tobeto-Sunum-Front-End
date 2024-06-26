import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { loginGuardFunc } from './guard/login.guard';
import { ShelfComponent } from './content/shelf/shelf.component';
import { StockalertComponent } from './content/stockalert/stockalert.component';
import { StockComponent } from './content/stock/stock.component';
import { EmployeeComponent } from './content/employee/employee.component';
import { TypeComponent } from './content/type/type.component';
import { ChartComponent } from './content/chart/chart.component';


const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent, canActivate: [loginGuardFunc],
    children: [
      {path: 'shelf', component: ShelfComponent},
      {path: 'chart', component: ChartComponent} ,
      {path: 'stockalert', component: StockalertComponent},
      {path: 'stock', component: StockComponent},
      {path: 'type', component: TypeComponent},
      {path: 'employee', component: EmployeeComponent},
    ]
  },
    
  
  
  {path: 'login', component: LoginComponent},  
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
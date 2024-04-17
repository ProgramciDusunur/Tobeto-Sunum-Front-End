import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './guard/login.guard';


const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent, canActivate: [LoginGuard]},
  {path: 'dashboard/shelf', component: DashboardComponent },
  {path: 'dashboard/home', component: DashboardComponent},
  {path: 'dashboard/stockalert', component: DashboardComponent},
  {path: 'dashboard/stock', component: DashboardComponent},
  {path: 'dashboard/employee', component: DashboardComponent},
  {path: 'login', component: LoginComponent},  
  {path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
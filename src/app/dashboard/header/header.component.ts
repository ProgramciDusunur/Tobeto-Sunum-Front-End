import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login/login.service';
import { EmployeeService } from '../../service/employee/employee.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit { // OnInit arayüzünü uygula
  constructor(
    private loginService: LoginService,
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) {}
  username = "";
  surname = "";

  ngOnInit(): void { // ngOnInit yöntemini uygula
    this.initUserNameAndSurname(); // test fonksiyonunu çağır
  }

  initUserNameAndSurname() {    
    this.username = this.loginService.username;
    this.surname = this.loginService.surname;    
  } 

}

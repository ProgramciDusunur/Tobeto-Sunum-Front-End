import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit { // OnInit arayüzünü uygula
  constructor(private loginService: LoginService) {}
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

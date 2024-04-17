import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../service/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  
  constructor(private loginService: LoginService, private router: Router) {}
  
  canActivate(): boolean {
    if (this.loginService.loggedIn) {
      // Giriş yapılmışsa istenen sayfanın gösterilmesine izin ver
      console.log("Çalışıyor!");
      return true;
    } else {
      if (!this.loginService.globalLogin) {
        console.log("Login false oldu!");
      // Giriş yapılmamışsa, izin verme ve login sayfasına yönlendir
      this.router.navigate(['/login']);
        return false;
      }
      
      return true;
    }
  }
}

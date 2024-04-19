import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../service/login/login.service';



export const loginGuardFunc: CanActivateFn = (route, state) => {
  let loginService =  inject(LoginService);
  let router = inject(Router);

  if (loginService.loggedIn) {
    // Giriş yapılmışsa istenen sayfanın gösterilmesine izin ver    
    return true;
  } else {    
    // Giriş yapılmamışsa, izin verme ve login sayfasına yönlendir
    router.navigate(['/login']);      
    return false;
  }    
}

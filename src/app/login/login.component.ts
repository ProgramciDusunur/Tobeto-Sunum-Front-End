import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { LoginService } from "../service/login/login.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = "";
  surname = "";


  loginForm = this.fb.nonNullable.group({
    email: ['', Validators.email],
    password: '',
  })

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

    submit() {
      let email = this.loginForm.get('email')!.value;
      let password = this.loginForm.get('password')!.value;
      
    
      this.loginService.login(email, password).subscribe({
        next: (resp) => {
          // login başarılı cevabı döndü
          this.toastr.info('Giriş Yapıldı.');          
          this.router.navigateByUrl('/dashboard');                    
        },
        error: (err) => {
          this.toastr.error('Kullanıcı adınızı veya şifrenizi kontrol edin.');          
          //this.loginService.loggedIn = false;
          // formun tüm alanlarının değerleri değiştirilmek isteniyorsa setValue fonksiyonu kullanılır.
          // Tüm alanların değerleri değiştirilmeyecekse patchValue fonksiyonu kullanılır.
          this.loginForm.patchValue({ password: '' });
          console.error(err);
        }
      });
    }
}
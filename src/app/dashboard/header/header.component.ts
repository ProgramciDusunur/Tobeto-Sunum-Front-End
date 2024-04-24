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


  employeePasswordChangeForm = new FormGroup({
    previousPassword: new FormControl(""),
    newPassword: new FormControl(""),
    newPasswordCheck: new FormControl(""),    
  });

  changePassword() {
    const previousPasswordControl = this.employeePasswordChangeForm.get('previousPassword');
    const newPasswordControl = this.employeePasswordChangeForm.get('newPassword');
    const newPasswordCheckControl = this.employeePasswordChangeForm.get('newPasswordCheck');
    
    const previousPasswordValue = previousPasswordControl !== null ? (previousPasswordControl.value !== null ? previousPasswordControl.value : "") : "";
    const newPasswordControlValue = newPasswordControl !== null ? (newPasswordControl.value !== null ? newPasswordControl.value : "") : "";
    
    const isPreviousPasswordValid = previousPasswordControl !== null && previousPasswordControl.value !== "";
    const isNewPasswordValid = newPasswordControl !== null && newPasswordControl.value !== "";
    const isNewPasswordCheckValid = newPasswordCheckControl !== null && newPasswordCheckControl.value !== "";
    
    
    
    const isAllValid = isPreviousPasswordValid && isNewPasswordValid && isNewPasswordCheckValid;
    
    if (isAllValid && newPasswordControl.value === newPasswordCheckControl.value) {
      // Tüm form elemanlarının değerleri geçerli
      //alert("emailiniz: " + this.loginService.email);
      
       this.employeeService.changePassword(previousPasswordValue, newPasswordControlValue, this.loginService.email).subscribe(
      (data) => {
        this.toastr.success("Şifreniz başarıyla güncellendi.");        
      },
      (error) => {
        this.toastr.error("Şifreniz güncellenirken bir hata oluştu.");        
      }
    );      
    } else if (isAllValid  && newPasswordControl.value !== newPasswordCheckControl.value) {
      alert("Yeni şifrenizi düzgün bir şekilde doğrulayın.");
    }
    else if (!isAllValid) {
      // En az bir form elemanının değeri geçerli değil
      alert("Bütün alanları doldurun.");
    }
  }


}

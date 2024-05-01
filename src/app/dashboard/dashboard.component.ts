import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../service/dashboard/dashboard.service';
import { LoginService } from '../service/login/login.service';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeeService } from '../service/employee/employee.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})



export class DashboardComponent implements OnInit {


  toggleSidebar() {
    const sidebar = document.querySelector("#sidebar");
    if (sidebar instanceof HTMLElement) {
        sidebar.classList.toggle("expand");
    } else {
        console.error("Element with id 'sidebar' not found.");
    }
  }
  

  componentEnabled: { [key: string]: boolean } = {
    'Anasayfa': false,
    'Kontrol Paneli': false,
    'Raf': false,
    'Bootstrap': false,
    'Ürün': false,
    'Stok': false,
    'Çalışan': false,
    'Stok Uyarısı': false
  };
  
  currentUrl: string;

  constructor(
    private router: Router, 
    private dashboardService: DashboardService,
    private loginService: LoginService,
    private employeeService: EmployeeService,
    private toastr: ToastrService,
    
    
    
  ) {
    this.currentUrl = this.router.url;    
  }

  ngOnInit(): void {
    // DashboardService'te yapılacak olan işlemleri burada gerçekleştirelim
    this.dashboardService.ngOnInit();   
    this.filterComponents();
    
  }
  filterComponents() {
    const role = this.loginService.rol;
    
    // Kullanıcı rolüne göre bileşenleri etkinleştir veya devre dışı bırak
    switch (role) {
      case 'admin':
        // Admin rolü için tüm bileşenleri etkinleştir
        Object.keys(this.componentEnabled).forEach(key => this.componentEnabled[key] = true);        
        break;
      case 'depo_sorumlusu':
        // User rolü için belirli bileşenleri etkinleştir veya devre dışı bırak                
        this.componentEnabled['Ürün'] = true;
        this.componentEnabled['Raf'] = true;
        this.componentEnabled['Stok Uyarısı'] = true;
        break;
      case 'rapor_kullanicisi':
        this.componentEnabled['Ürün'] = true;
        this.componentEnabled['Stok Uyarısı'] = true;
        
      break;
      // Diğer roller için gerekli işlemler yapılabilir
    }
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
      
       this.employeeService.changePassword(previousPasswordValue, newPasswordControlValue, this.loginService.email).subscribe({
      next: (data) => {
        this.toastr.success("Şifreniz başarıyla güncellendi.");        
      },
      error: (error) => {
        this.toastr.error("Şifreniz güncellenirken bir hata oluştu.");        
      }
    });      
    } else if (isAllValid  && newPasswordControl.value !== newPasswordCheckControl.value) {
      alert("Yeni şifrenizi düzgün bir şekilde doğrulayın.");
    }
    else if (!isAllValid) {
      // En az bir form elemanının değeri geçerli değil
      alert("Bütün alanları doldurun.");
    }
  
    
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['login']);
  }
}
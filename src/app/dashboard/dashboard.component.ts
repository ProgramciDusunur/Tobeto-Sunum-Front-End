import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../service/dashboard/dashboard.service';
import { LoginService } from '../service/login/login.service';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeeService } from '../service/employee/employee.service';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../service/models/employee.model';
import { StockAlert } from '../service/models/stockalert.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})



export class DashboardComponent implements OnInit {
  profileForm = new FormGroup({
    name: new FormControl(""),
    surname: new FormControl(""),
    email: new FormControl(""),
    role: new FormControl(""),
    canEditName: new FormControl(false),
    canEditSurname: new FormControl(false),
    canEditRole:new FormControl(false),
    canEditEmail:new FormControl(false) 
  });


  printLowStockAlerts: StockAlert[] = [];




  toggleSidebar() {
    const sidebar = document.querySelector("#sidebar");
    if (sidebar instanceof HTMLElement) {
        sidebar.classList.toggle("expand");
    } else {
        console.error("ElementemployeeId?: numberemployeeId: numberemployeeId: numberemployeeId: numberemployeeId?: numberemployeeId: number with id 'sidebar' not found.");
    }
  }
  
  

  currentUserRole: string = this.loginService.rol;
  
  currentUrl: string;

  constructor(
    private router: Router, 
    private dashboardService: DashboardService,
    private loginService: LoginService,
    private employeeService: EmployeeService,
    private toastr: ToastrService,
    private renderer: Renderer2
    
    
  ) {
    this.currentUrl = this.router.url;    
    setInterval(() => this.renderNotify(), 60000); // 1 dakika aralıklarla renderNotification çağrısı
  }

  ngOnInit(): void {
    // DashboardService'te yapılacak olan işlemleri burada gerçekleştirelim
    this.renderNotify();    
  }

  renderNotify()  {    
    this.dashboardService.getStockAlertNotification().subscribe({
      next: (resp) => {        
        this.printLowStockAlerts = this.dashboardService.lowStockAlerts;
      },
      error: (err) => {
       
      }
    });    
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
  employeeInfo: Employee = {
    name: "",
    surname: "",
    email: "",
    role: "",
    id: 0
  }

  getProfile() {    
    this.employeeInfo.name=this.loginService.username;
    this.employeeInfo.surname=this.loginService.surname;
    this.employeeInfo.email=this.loginService.email;
    this.employeeInfo.role=this.loginService.rol  
  }
}
  

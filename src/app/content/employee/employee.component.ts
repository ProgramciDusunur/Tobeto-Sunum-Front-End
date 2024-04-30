import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../service/employee/employee.service';
import { AdminPasswordEmployee, Employee, RequestEmployee } from '../../service/models/employee.model';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from "@angular/forms";



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  typeOptions: { value: string; label: string }[] = [
    { value: 'addUser', label: 'Kullanıcı Ekle' },    
    { value: 'changePassword', label: 'Şifre Değiştir' },    
    // Add more options as needed
  ];

  onTypeChange(event: any) {
    this.selectedType = event.target.value;    
  }

  employee: RequestEmployee = {
    password: "",
    name: '',
    surname: '',
    email: '',
    role: ''
  };

  changePasswordEmployee: AdminPasswordEmployee = {
    newPassword: "",
    email: ""
  }
  
  employees: Employee[] = [];
  selectedType: string = '';

  constructor(
    private employeeService: EmployeeService,
    private toastr: ToastrService,
  ) {}

  personForm = new FormGroup({
    name: new FormControl(""),
    surname: new FormControl(""),
    email: new FormControl(""),
    role: new FormControl(""),
    password: new FormControl(""),
    changePassword: new FormControl(""),
    changePasswordEmail: new FormControl(""),

  });


  addEmployee(employee: RequestEmployee): void {    
    this.employeeService.addEmployee(employee).subscribe({
      next: (data) => {        
        this.toastr.info("Kullanıcı başarıyla eklendi.");
      },
      error: (error) => {
        this.toastr.error("Kullanıcı eklemesi başarısız.");
      }
    });   
  }

  selectedEmployee: any;
  selectedEmployeeIdForRemove: any;

  selectEmployee(index: number): void {
    this.selectedEmployee = this.employees[index];
    this.selectedEmployeeIdForRemove = this.employees[index].email;
  }

  removeEmployee() {
    this.employeeService.removeSpecificEmployee(this.selectedEmployeeIdForRemove).subscribe(
      (data) => {
        this.toastr.success("Employee succesfully removed.");        
      },
      (error) => {
        this.toastr.error("Employee can't removed.");        
      }
    );
  }
  


  saveUser(): void {        
    const nameControl = this.personForm.get('name');
    const surnameControl = this.personForm.get('surname');
    const emailControl = this.personForm.get('email');
    const roleControl = this.personForm.get('role');
    const passwordControl = this.personForm.get('password');
    
    const isNameValid = nameControl !== null && nameControl.value !== "";
    const isSurnameValid = surnameControl !== null && surnameControl.value !== "";
    const isEmailValid = emailControl !== null && emailControl.value !== "";
    const isRoleValid = roleControl !== null && roleControl.value !== "";
    const isPasswordValid = passwordControl !== null && passwordControl.value !== "";
    
    const isAllValid = isNameValid && isSurnameValid && isEmailValid && isRoleValid && isPasswordValid;
    
    if (isAllValid) {
      // Tüm form elemanlarının değerleri geçerli
      this.employee.name = nameControl.value;
      this.employee.surname = surnameControl.value
      this.employee.email = emailControl.value;      
      this.employee.password = passwordControl.value;   
      this.employee.role = roleControl.value;      
      this.addEmployee(this.employee);
    } else {
      // En az bir form elemanının değeri geçerli değil
      alert("Bütün alanları doldurun.");
    }
  }

  changePassword(newPassword: string, email: string) {
    this.employeeService.changePasswordAdmin(newPassword, email).subscribe(
      (data) => {
        this.toastr.success("Admin tarafından kullanıcının şifresi başarıyla değiştirildi.");        
      },
      (error) => {
        this.toastr.error("Admin tarafından kullanıcının şifre değişimi başarısız oldu.");        
      }
    );
  }

  saveChangedPassword() {
    const changePasswordControl = this.personForm.get('changePassword');
    const changePasswordEmailControl = this.personForm.get('changePasswordEmail');

    const isNameValid = changePasswordControl !== null && changePasswordControl.value !== "";
    const isSurnameValid = changePasswordEmailControl !== null && changePasswordEmailControl.value !== "";

    const isAllValid = isNameValid && isSurnameValid;

    if (isAllValid) {
      // Tüm form elemanlarının değerleri geçerli
      this.changePasswordEmployee.newPassword= changePasswordControl.value;
      this.changePasswordEmployee.email = changePasswordEmailControl.value
      alert("Email:  "+ this.changePasswordEmployee.email);
      this.changePassword(this.changePasswordEmployee.newPassword, this.changePasswordEmployee.email);
    } else {
      // En az bir form elemanının değeri geçerli değil
      alert("Bütün alanları doldurun.");
    }
  }

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe(
      (data: Employee[]) => {
        this.employees = data;                
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  


 
  
   

}





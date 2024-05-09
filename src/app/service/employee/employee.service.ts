import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee, RequestEmployee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
 
  



  private allEmployeesUrl = '/employee/get/all';
  private addEmployeeUrl = '/employee/add';
  private removeSpecificEmployeeUrl =  '/employee/del';
  private changePasswordEmployeeUrl ='/employee/edit/password'
  private changePasswordAdminEmployeeUrl = '/employee/edit/password/admin'


  constructor(private http: HttpClient) { }

 

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.allEmployeesUrl);
  }

  addEmployee(employee: RequestEmployee): Observable<RequestEmployee> {
    return this.http.post<RequestEmployee>(this.addEmployeeUrl, employee);
  }

  removeSpecificEmployee(employeeEmail: number): Observable<Employee> {
    const body = { email: employeeEmail };
    return this.http.post<Employee>(this.removeSpecificEmployeeUrl, body);
  }

  changePassword(previousPassword: string, newPassword: string, employeeEmail: string): Observable<Employee> {
    const body = {previousPassword: previousPassword,
                  newPassword: newPassword,
                  email: employeeEmail};
    return this.http.post<Employee>(this.changePasswordEmployeeUrl, body);
  }

  changePasswordAdmin(newPassword: string, email: string): Observable<Employee> {
    const body = {newPassword: newPassword,                  
                  email: email};
    return this.http.post<Employee>(this.changePasswordAdminEmployeeUrl, body);
  }
  
}

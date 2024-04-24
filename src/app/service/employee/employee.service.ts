import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Employee, RequestEmployee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  static addEmployee() {
    throw new Error('Method not implemented.');
  }

  apiUrl = environment.serverURL;

  private allEmployeesUrl = this.apiUrl+'/employee/get/all';
  private addEmployeeUrl = this.apiUrl+'/employee/add';
  private removeSpecificEmployeeUrl = this.apiUrl + '/employee/del';
  private changePasswordEmployeeUrl = this.apiUrl+'/employee/edit/password'


  constructor(private http: HttpClient) { }

  createAuthHeader() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+ localStorage.getItem("token"),      
    });
    return headers;
  }

  getAllEmployees(): Observable<Employee[]> {
    const headers = this.createAuthHeader();
    return this.http.get<Employee[]>(this.allEmployeesUrl, {headers});
  }

  addEmployee(employee: RequestEmployee): Observable<RequestEmployee> {
    const headers = this.createAuthHeader();
    return this.http.post<RequestEmployee>(this.addEmployeeUrl, employee, { headers });
  }

  removeSpecificEmployee(employeeEmail: number): Observable<Employee> {
    const headers = this.createAuthHeader();
    const body = { email: employeeEmail };
    return this.http.post<Employee>(this.removeSpecificEmployeeUrl, body, { headers });
  }

  changePassword(previousPassword: string, newPassword: string, employeeEmail: string): Observable<Employee> {
    const headers = this.createAuthHeader();
    const body = {previousPassword: previousPassword,
                  newPassword: newPassword,
                  email: employeeEmail};
    return this.http.post<Employee>(this.changePasswordEmployeeUrl, body, { headers });
  }
  
}

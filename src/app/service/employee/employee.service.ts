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


  constructor(private http: HttpClient) { }

  createAuthHeader() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+ localStorage.getItem("token"),      
    });
    return headers;
  }

  getAllEmployees(): Observable<Employee[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+ localStorage.getItem("token"),      
    });
    return this.http.get<Employee[]>(this.allEmployeesUrl, {headers});
  }

  addEmployee(employee: RequestEmployee): Observable<RequestEmployee> {
    const headers = this.createAuthHeader();
    return this.http.post<RequestEmployee>(this.addEmployeeUrl, employee, { headers });
  }

  removeSpecificEmployee(employeeıd: number): Observable<Employee> {
    const headers = this.createAuthHeader();
    const body = { id: employeeıd };
    return this.http.post<Employee>(this.removeSpecificEmployeeUrl, body,{ headers });
  }
  
}

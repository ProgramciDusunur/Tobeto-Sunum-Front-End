import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl = environment.serverURL;

  private allEmployeesUrl = this.apiUrl+'/employee/get/all';


  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<Employee[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+ localStorage.getItem("token"),      
    });
    return this.http.get<Employee[]>(this.allEmployeesUrl, {headers});
  }
}

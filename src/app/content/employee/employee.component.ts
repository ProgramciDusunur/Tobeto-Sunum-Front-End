import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../service/employee/employee.service';
import { Employee } from '../../service/models/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit {
  constructor(private employeeService: EmployeeService) {}

  employees: Employee[] = [];
  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe(
      (data: Employee[]) => {
        this.employees = data;                
      },
      (error) => {
        console.error('Error fetching stock:', error);
      }
    );
  }

}

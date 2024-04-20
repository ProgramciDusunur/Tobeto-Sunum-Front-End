import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../service/employee/employee.service';
import { Employee } from '../../service/models/employee.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  selectedType: string = '';

  constructor(
    private employeeService: EmployeeService,
    private toastr: ToastrService,
  ) {}

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

  addEmployee(): void {
    const employee: Employee = {
      id: 1,
      name: 'John Doe',
      surname: '',
      email: '',
      role: ''
    };

    this.employeeService.addEmployee(employee).subscribe(
      (data: any) => {
        console.log('Employee added successfully');
      },
      (error: any) => {
        console.error('Error adding employee:', error);
      }
    );
  }


  selectedEmployee: any;
  selectedEmployeeIdForRemove: any;

  selectEmployee(index: number): void {
    this.selectedEmployee = this.employees[index];
    this.selectedEmployeeIdForRemove = this.employees[index].id;
  }
  
   

}


  




function fetchEmployees() {
  throw new Error('Function not implemented.');
}

function ngOnInit() {
  throw new Error('Function not implemented.');
}

function addEmployee() {
  throw new Error('Function not implemented.');
}


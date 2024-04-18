import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../service/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUrl: string;

  constructor(
    private router: Router, private dashboardService: DashboardService,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    this.currentUrl = this.router.url;
    
  }

  ngOnInit(): void {
    // DashboardService'te yapılacak olan işlemleri burada gerçekleştirelim
    this.dashboardService.ngOnInit();   
    
  }

  redirectToHome(): void {
    this.router.navigate(['/dashboard']); 
    console.log("Sidebar home a gidiyor...");
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  currentUrl: string;

  constructor(private router: Router) {
    this.currentUrl = this.router.url;       
  }

  redirectToHome(): void {
    this.router.navigate(['/dashboard']); 
    console.log("Sidebar home a gidiyor...");
  }

}

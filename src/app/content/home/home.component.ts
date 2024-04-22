import { Component } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-content-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private router: Router) {} // Router servisini enjekte edin

  redirectToShelf(): void {
    this.router.navigate(['/dashboard/shelf']); // Belirli bir URL'ye yönlendirme
  }

  redirectToEmployee(): void {
    this.router.navigate(['/dashboard/employee']); // Belirli bir URL'ye yönlendirme
  }

  redirectToProduct(): void {
    this.router.navigate(['/dashboard/stock']); // Belirli bir URL'ye yönlendirme
  }

}

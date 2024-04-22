import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../service/dashboard/dashboard.service';
import { LoginService } from '../service/login/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  componentEnabled: { [key: string]: boolean } = {
    'Anasayfa': true,
    'Kontrol Paneli': false,
    'Raf': true,
    'Bootstrap': true,
    'Ürün': false,
    'Çalışan': true,
    'Stok Uyarısı': false
  };
  
  currentUrl: string;

  constructor(
    private router: Router, private dashboardService: DashboardService,
    private loginService: LoginService
    
  ) {
    this.currentUrl = this.router.url;    
  }

  ngOnInit(): void {
    // DashboardService'te yapılacak olan işlemleri burada gerçekleştirelim
    this.dashboardService.ngOnInit();   
    
  }
  filterComponents() {
    const role = this.loginService.rol;
    
    // Kullanıcı rolüne göre bileşenleri etkinleştir veya devre dışı bırak
    switch (role) {
      case 'admin':
        // Admin rolü için tüm bileşenleri etkinleştir
        Object.keys(this.componentEnabled).forEach(key => this.componentEnabled[key] = true);
        break;
      case 'user':
        // User rolü için belirli bileşenleri etkinleştir veya devre dışı bırak
        this.componentEnabled['Kontrol Paneli'] = false;
        this.componentEnabled['Ürün'] = false;
        this.componentEnabled['Stok Uyarısı'] = true;
        break;
      // Diğer roller için gerekli işlemler yapılabilir
    }
  }
  
}

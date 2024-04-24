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
    'Anasayfa': false,
    'Kontrol Paneli': false,
    'Raf': false,
    'Bootstrap': false,
    'Ürün': false,
    'Çalışan': false,
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
    this.filterComponents();
    
  }
  filterComponents() {
    const role = this.loginService.rol;
    
    // Kullanıcı rolüne göre bileşenleri etkinleştir veya devre dışı bırak
    switch (role) {
      case 'admin':
        // Admin rolü için tüm bileşenleri etkinleştir
        Object.keys(this.componentEnabled).forEach(key => this.componentEnabled[key] = true);        
        break;
      case 'depo_sorumlusu':
        // User rolü için belirli bileşenleri etkinleştir veya devre dışı bırak                
        this.componentEnabled['Ürün'] = true;
        this.componentEnabled['Raf'] = true;
        this.componentEnabled['Stok Uyarısı'] = true;
        break;
      case 'rapor_kullanicisi':
        this.componentEnabled['Ürün'] = true;
        this.componentEnabled['Stok Uyarısı'] = true;
        
      break;
      // Diğer roller için gerekli işlemler yapılabilir
    }
  }
  
}

import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { forkJoin } from 'rxjs';
import { StockAlertService } from '../stockalert/stockalert.service';
import { StockService } from '../stock/stock.service';
import { StockAlert } from '../models/stockalert.model';
import { Stock } from '../models/stock.models';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private renderer: Renderer2;
  stockAlerts: StockAlert[] = [];
  stocks: Stock[] = [];
  lowStockAlerts: StockAlert[] = [];

  constructor(
    private stockAlertService: StockAlertService,
    private stockService: StockService,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.renderNotification(); // İlk renderNotification çağrısı
    setInterval(() => this.getStockAlertNotification(), 60000); // 1 dakika aralıklarla renderNotification çağrısı
  }

  ngOnInit(): void {
    this.getStockAlertNotification();
  }

  getStockAlertNotification(): void {
    forkJoin({
      stockAlerts: this.stockAlertService.getAllStockAlerts(),
      stocks: this.stockService.getAllStocks()
    }).subscribe({
      next: (response) => {
        this.stockAlerts = response.stockAlerts;
        this.stocks = response.stocks;

        this.lowStockAlerts = this.stockAlerts.filter(alert => {
          const correspondingStock = this.stocks.find(stock => stock.id === alert.stockId);
          return correspondingStock && correspondingStock.quantity <= alert.alertQuantity;
        }); 

        this.renderNotification();
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });

  }

  private renderNotification(): void {
    const lowStockLength = this.lowStockAlerts.length;    
    const modalBody = document.querySelector('#notificationModal .modal-body');
    
    if (modalBody !== null) {
      modalBody.innerHTML = '';
      if (lowStockLength > 0) {            
        for (let i = 0; i < lowStockLength; i++) {
          const notificationElement = document.querySelector('.lni-alarm');
          this.renderer.setStyle(notificationElement, 'color', 'red'); // Kırmızı renk                         
  
            // Label oluştur
            const label = document.createElement('label');
            label.textContent = 'Düşük Stok Uyarısı';
            label.classList.add('form-label');
    
            // Input oluştur
            const input = document.createElement('input');
            input.type = 'text';
            input.classList.add('form-control');
            input.disabled = true; // Inputu disabled yap
    
            // Veriyi inputa yerleştir
            input.value = "Stock ID: "+this.lowStockAlerts[i].stockId;
    
            // Label ve Inputu modal body'sine ekle
            modalBody.appendChild(label);
            modalBody.appendChild(input);
          
        }
      }
    }
    
  }
  
}
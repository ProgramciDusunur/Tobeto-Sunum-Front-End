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
  }

  ngOnInit(): void {
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
    if (lowStockLength > 0) {
      const notificationElement = document.querySelector('.notification');
      this.renderer.setStyle(notificationElement, 'color', 'red'); // Kırmızı renk
      // Örnek olarak, başka bir bileşenin ul elementine li ekleyelim
      const otherComponentUl = document.querySelector('.notificationDropDown');    
      for (let i = 0; i < lowStockLength;i++) {        
        if (otherComponentUl) {
          const li = document.createElement('li');          
          li.classList.add("dropdown-item");          
          li.textContent = 'Low Stock Alert Stock ID: ' + this.lowStockAlerts[i].stockId;
          otherComponentUl.appendChild(li);          
        }
      }
            
    }
  }
}
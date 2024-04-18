import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { forkJoin } from 'rxjs';
import { StockalertService } from '../stockalert/stockalert.service';
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
    private stockAlertService: StockalertService,
    private stockService: StockService,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }


  ngOnInit(): void {
    // forkJoin ile tüm istekleri birleştirerek tek bir abonelik oluşturuyoruz
    forkJoin({
      stockAlerts: this.stockAlertService.getAllStockAlerts(),
      stocks: this.stockService.getAllStocks()
    }).subscribe({
      next: (response) => {
        // Her iki istek de tamamlandığında bu blok çalışır
        this.stockAlerts = response.stockAlerts;
        this.stocks = response.stocks;
        
        // StockAlert'ler ile Stocks'u karşılaştır ve koşulu sağlayanları lowStockAlerts listesine ekle
        this.lowStockAlerts = this.stockAlerts.filter(alert => {
          const correspondingStock = this.stocks.find(stock => stock.id === alert.stockId);
          return correspondingStock && correspondingStock.quantity <= alert.alertQuantity;
        });

        console.log("Hey Selamlar StockAlerts: ", this.stockAlerts);
        console.log("Hey Selamlar Stock: ", this.stocks);
        console.log("Hey Selamlar Low Stock Alerts: ", this.lowStockAlerts); 

        // DOM manipülasyonu için render metodu çağrılıyor
        this.renderNotification();
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  // DOM manipülasyonunu gerçekleştiren metod
  private renderNotification(): void {
    const lowStockLength = this.lowStockAlerts.length;
    console.log("Dashboard componentte stock uyarisi: " + lowStockLength);
    if (lowStockLength > 0) {
      const notificationElement = document.querySelector('.notification');
      if (notificationElement) {
        this.renderer.setStyle(notificationElement, 'color', 'red'); // Kırmızı renk
        console.log("Uyari alan urunler var!");
      } else {
        console.error("Notification element not found");
      }
    }
  }
}

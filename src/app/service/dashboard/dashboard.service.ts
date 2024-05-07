import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { StockAlertService } from '../stockalert/stockalert.service';
import { StockService } from '../stock/stock.service';
import { StockAlert } from '../models/stockalert.model';
import { Stock } from '../models/stock.models';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {  
  stockAlerts: StockAlert[] = [];
  stocks: Stock[] = [];
  lowStockAlerts: StockAlert[] = [];

  constructor(
    private stockAlertService: StockAlertService,
    private stockService: StockService    
  ) {    
    
  }


  getStockAlertNotification(): Observable<void> {
    return new Observable<void>((observer) => {
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
  
          
          observer.next(); // Observable'a tamamlandığını bildir
          observer.complete(); // Observable'ı tamamla
        },
        error: (error) => {
          console.error('Error fetching data:', error);
          observer.error(error); // Hata durumunda observable'a hatayı bildir
        }
      });
    });
  }
}
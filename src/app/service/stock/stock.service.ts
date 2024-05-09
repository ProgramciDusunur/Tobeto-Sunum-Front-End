import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EditStock, Stock } from '../models/stock.models';

@Injectable({
  providedIn: 'root'
})
export class StockService {



  private getAllStocksUrl ='/stock/get/all';
  private removeSpecificStockUrl ='/stock/del';
  private addStockUrl ='/stock/add'
  private editStockUrl ='/stock/put'


  constructor(private http: HttpClient) { }



  getAllStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.getAllStocksUrl);
  }

  removeSpecificStock(stockId: number): Observable<Stock> {
    const body = { id: stockId }; // Gövde içeriği
    return this.http.post<Stock>(this.removeSpecificStockUrl, body);    
  }

  addStock(stock: Stock): Observable<Stock> {    
    const body = { quantity: stock.quantity,
                   type: stock.type,
                   typeId: stock.typeId}; // Gövde içeriği
    return this.http.post<Stock>(this.addStockUrl, body);    
  }

  editStock(stock: EditStock):Observable<Stock> { 
    const body = { 
      quantity: stock.quantity,
      id: stock.id}
    return this.http.post<Stock>(this.editStockUrl, body);    
  }
}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../models/stock.models';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  apiUrl = environment.serverURL;

  private getAllStocksUrl = this.apiUrl+'/stock/get/all';
  private removeSpecificStockUrl = this.apiUrl + '/stock/del';


  constructor(private http: HttpClient) { }

  createAuthHeader() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+ localStorage.getItem("token"),      
    });
    return headers;
  }


  getAllStocks(): Observable<Stock[]> {
    const headers = this.createAuthHeader();
    return this.http.get<Stock[]>(this.getAllStocksUrl, {headers});
  }

  removeSpecificStock(stockId: number): Observable<Stock> {
    const headers = this.createAuthHeader();
    const body = { id: stockId }; // Gövde içeriği
    return this.http.post<Stock>(this.removeSpecificStockUrl, body, { headers });
    
  }
}

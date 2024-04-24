import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockAlert, RequestStockAlert } from '../models/stockalert.model';


@Injectable({
  providedIn: 'root'
})
export class StockAlertService {

  apiUrl = environment.serverURL;

  private getAllStockAlertUrl = this.apiUrl+'/stockalert/get/all';
  private addStockAlertUrl = this.apiUrl+'/stockalert/add';
  private removeStockAlertUrl = this.apiUrl+'/stockalert/del'

  createAuthHeader() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+ localStorage.getItem("token"),      
    });
    return headers;
  }

  constructor(private http: HttpClient) { }

  getAllStockAlerts(): Observable<StockAlert[]> {    
    const headers = this.createAuthHeader();
    return this.http.get<StockAlert[]>(this.getAllStockAlertUrl, {headers});
  }

  addStockAlert(stockId: number, alertQuantity: number): Observable<RequestStockAlert> {
    const headers = this.createAuthHeader();
    const body = { stockId: stockId, alertQuantity: alertQuantity};
    return this.http.post<RequestStockAlert>(this.addStockAlertUrl, body, {headers});
  }

  removeStockAlert(id: number) {
    const headers = this.createAuthHeader();
    const body = { id: id};
    return this.http.post(this.removeStockAlertUrl, body, {headers});
  }


}

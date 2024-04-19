import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockAlert } from '../models/stockalert.model';


@Injectable({
  providedIn: 'root'
})
export class StockalertService {

  apiUrl = environment.serverURL;

  private stockAlertUrl = this.apiUrl+'/stockalert/get/all';


  constructor(private http: HttpClient) { }

  getAllStockAlerts(): Observable<StockAlert[]> {    
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+ localStorage.getItem("token"),      
    });
    return this.http.get<StockAlert[]>(this.stockAlertUrl, {headers});
  }
}

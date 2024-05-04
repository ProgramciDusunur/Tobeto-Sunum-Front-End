import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockAlert, RequestStockAlert } from '../models/stockalert.model';


@Injectable({
  providedIn: 'root'
})
export class StockAlertService {



  private getAllStockAlertUrl ='/stockalert/get/all';
  private addStockAlertUrl ='/stockalert/add';
  private removeStockAlertUrl ='/stockalert/del';



  constructor(private http: HttpClient) { }

  getAllStockAlerts(): Observable<StockAlert[]> {    
    return this.http.get<StockAlert[]>(this.getAllStockAlertUrl);
  }

  addStockAlert(stockId: number, alertQuantity: number): Observable<RequestStockAlert> {
    const body = { stockId: stockId, alertQuantity: alertQuantity};
    return this.http.post<RequestStockAlert>(this.addStockAlertUrl, body);
  }

  removeStockAlert(id: number) {
    const body = { id: id};
    return this.http.post(this.removeStockAlertUrl, body);
  }


}

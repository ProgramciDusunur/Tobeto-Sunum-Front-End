import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Shelf } from '../models/shelf.model';




@Injectable({
  providedIn: 'root'
})
export class ShelfService { 
  apiUrl = environment.serverURL;

  private getAllShelvesUrl = this.apiUrl+'/shelf/get/all';
  private removeSpecificShelfUrl = this.apiUrl + '/shelf/del';
  private addShelfUrl = this.apiUrl+'/shelf/add';

  createAuthHeader() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+ localStorage.getItem("token"),      
    });
    return headers;
  }

  constructor(private http: HttpClient) { }

  getAllShelves(): Observable<Shelf[]> {
    const headers = this.createAuthHeader();
    return this.http.get<Shelf[]>(this.getAllShelvesUrl, {headers});
  }
  
  removeSpecificShelf(shelfId: number): Observable<Shelf> {
    const headers = this.createAuthHeader();
    const body = { id: shelfId }; // Gövde içeriği
    return this.http.post<Shelf>(this.removeSpecificShelfUrl, body, { headers });    
  }
  
  addShelf(stockId: number, occupiedQuantity: number): Observable<Shelf> {
    const headers = this.createAuthHeader();
    const body = { stockId: stockId, occupiedQuantity: occupiedQuantity }; // Gövde içeriği
    return this.http.post<Shelf>(this.addShelfUrl, body, { headers });    
  }


}

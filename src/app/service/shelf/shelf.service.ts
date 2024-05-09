import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shelf } from '../models/shelf.model';




@Injectable({
  providedIn: 'root'
})
export class ShelfService { 

  private getAllShelvesUrl = '/shelf/get/all';
  private removeSpecificShelfUrl ='/shelf/del';
  private addShelfUrl ='/shelf/add';


  constructor(private http: HttpClient) { }

  getAllShelves(): Observable<Shelf[]> {
    return this.http.get<Shelf[]>(this.getAllShelvesUrl);
  }
  
  removeSpecificShelf(shelfId: number): Observable<Shelf> {
    const body = { id: shelfId }; // Gövde içeriği
    return this.http.post<Shelf>(this.removeSpecificShelfUrl, body);    
  }
  
  addShelf(stockId: number, occupiedQuantity: number): Observable<Shelf> {
    const body = { stockId: stockId, occupiedQuantity: occupiedQuantity }; // Gövde içeriği
    return this.http.post<Shelf>(this.addShelfUrl, body);    
  }


}

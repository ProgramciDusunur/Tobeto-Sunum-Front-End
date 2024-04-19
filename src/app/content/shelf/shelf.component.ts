import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { ShelfService } from '../../service/shelf/shelf.service';
import { Shelf } from '../../service/models/shelf.model';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.scss']
})
export class ShelfComponent  {
   backgroundColor  = 'red';  
   shelves: Shelf[] = [];

  constructor(
    private shelfService: ShelfService,
    private toastr: ToastrService,
  ) { }

  selectedShelf: any; // Seçilen stokun verilerini tutmak için bir değişken
  selectedShelfIdForRemove: any;

  selectShelf(index: number) {
    this.selectedShelf = this.shelves[index];
    this.selectedShelfIdForRemove = this.shelves[index].id;    
}
 

  ngOnInit(): void {
    this.shelfService.getAllShelves().subscribe(
      (data: Shelf[]) => {
        this.shelves = data;        
        
      },
      (error) => {
        console.error('Error fetching shelves:', error);
      }
    );
  }

  removeShelf() {
    const whichId = this.selectedShelfIdForRemove;    
    this.shelfService.removeSpecificShelf(whichId).subscribe(
      (data) => {
        this.toastr.success("Shelf succesfully removed.");        
      },
      (error) => {
        this.toastr.error("Shelf can't removed.");        
      }
    );
  }
  
}

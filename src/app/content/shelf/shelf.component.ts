import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { ShelfService } from '../../service/shelf/shelf.service';
import { RequestShelf, Shelf } from '../../service/models/shelf.model';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.scss']
})
export class ShelfComponent  {
  typeOptions: { value: string; label: string }[] = [
    { value: 'Raf Ekle', label: 'Raf Ekle' },   
    // Add more options as needed
  ];

  selectedType: string = ''; // Initialize selected value

  onTypeChange(event: any) {
    this.selectedType = event.target.value;    
  }

  shelfForm = new FormGroup({
    stockId: new FormControl(0),
    occupiedQuantity: new FormControl(0)    
  });

  shelf: RequestShelf = {
    stockId: 0,
    occupiedQuantity: 0
    
  };


   
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

  addShelf(shelf: RequestShelf): void {    
    this.shelfService.addShelf(shelf.stockId, shelf.occupiedQuantity).subscribe(
      (data: any) => {
        this.toastr.success('Shelf added successfully');
      },
      (error: any) => {
        this.toastr.error('Error adding shelf.');        
      }
    );
  }

  saveShelf() {    
    const stockIdControl = this.shelfForm.get('stockId');
    const occupiedQuantityControl = this.shelfForm.get('occupiedQuantity');    
    
    const stockIdValue = stockIdControl !== null ? (stockIdControl.value !== null ? stockIdControl.value : 0) : 0;
    const occupiedQuantityValue = occupiedQuantityControl !== null ? (occupiedQuantityControl.value !== null ? occupiedQuantityControl.value : 0) : 0;

    const isStockIdValid = stockIdControl !== null && stockIdValue !== 0;
    const occupiedQuantityValueValid = occupiedQuantityValue !== null;

    
    const isAllValid = isStockIdValid && occupiedQuantityValueValid;
    
    if (isAllValid) {
      // Tüm form elemanlarının değerleri geçerli      
      this.shelf.occupiedQuantity = occupiedQuantityValue;
      this.shelf.stockId = stockIdValue;
      
      this.addShelf(this.shelf);
    } else {
      // En az bir form elemanının değeri geçerli değil
      alert("Bütün alanları doldurun.");
    }        
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

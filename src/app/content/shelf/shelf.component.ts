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
    this.shelfService.getAllShelves().subscribe({
      next: (data: Shelf[]) => {
        this.shelves = data;
      },
      error: (error) => {
        console.error('Raf bilgileri alınırken hata oluştu:', error);
        // Hata durumunda kullanıcıya bir hata mesajı gösterilebilir
        this.toastr.error('Raf bilgileri alınırken hata oluştu. Lütfen daha sonra tekrar deneyin.');
      }
    });
    
}

addShelf(shelf: RequestShelf): void {    
  this.shelfService.addShelf(shelf.stockId, shelf.occupiedQuantity).subscribe({
    next: (data: any) => {
      this.toastr.success('Raf başarıyla eklendi.');
    },
    error: (error: any) => {
      console.error('Raf eklenirken hata oluştu:', error);
      this.toastr.error('Raf eklenirken hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  });
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
    this.shelfService.removeSpecificShelf(whichId).subscribe({
      next: (data) => {
        this.toastr.success("Raf başarıyla kaldırıldı.");
      },
      error: (error) => {
        console.error("Raf kaldırılırken hata oluştu:", error);
        this.toastr.error("Raf kaldırılırken hata oluştu. Lütfen daha sonra tekrar deneyin.");
      }
    });
}
  
}

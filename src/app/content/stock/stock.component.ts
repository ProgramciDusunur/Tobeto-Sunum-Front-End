import { Component, OnInit } from '@angular/core';
import { StockService } from '../../service/stock/stock.service';
import { Stock } from '../../service/models/stock.models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss'
})
export class StockComponent implements OnInit {
  processOptions: { value: string; label: string }[] = [
    { value: 'Add Product', label: 'Add Product' },
    { value: 'Remove Product', label: 'Remove Product' },
    { value: 'Decrease Quantity', label: 'Decrease Quantity' }    
    // Add more options as needed
  ];

  typeOptions: { value: string; label: string }[] = [
    { value: 'CPU', label: 'CPU' },
    { value: 'GPU', label: 'GPU' },
    { value: 'PSU', label: 'PSU' },
    { value: 'RAM', label: 'RAM' },
    { value: 'Motherboard', label: 'Motherboard' },
    { value: 'Computer Case', label: 'Computer Case' },
    { value: 'CPU Cooler', label: 'CPU Cooler' },
    // Add more options as needed
  ];
  
  constructor(
    private stockService: StockService,
    private toastr: ToastrService,

  ) {}

  stock: Stock[] = [];
  ngOnInit(): void {
    this.fetchStocks();
  }

  fetchStocks(): void {
    this.stockService.getAllStocks().subscribe(
      (data: Stock[]) => {
        this.stock = data;
      },
      (error) => {
        console.error('Error fetching stock:', error);
      }
    );
  }

  selectedStock: any; // Seçilen stokun verilerini tutmak için bir değişken
  selectedStockIdForRemove: any;

  selectStock(index: number) {
      this.selectedStock = this.stock[index];
      this.selectedStockIdForRemove = this.stock[index].id;     
  }

  selectedType: string = ''; // Initialize selected value
  onTypeChange(event: any) {
    this.selectedType = event.target.value;    
  }

  selectedProcess: string = ''; // Initialize selected value
  onProcessChange(event: any) {
    this.selectedProcess = event.target.value;
    if (this.selectedProcess === "Decrease Quantity") {
        this.testMethod();
    }
  }

  testMethod() {
    this.selectedType = '';
  }



  selectedRamType: string = ''; // Seçilen RAM türünü tutacak değişken
  ramCapacityOptions: string[] = []; // RAM kapasite seçeneklerini tutacak dizi

  onRamTypeChange(ramType: string) {
    this.selectedRamType = ramType; // Seçilen RAM türünü güncelle
    // Seçilen RAM türüne göre kapasite seçeneklerini güncelle
    this.ramCapacityOptions = this.getRamCapacityOptions(ramType);
  }

  getRamCapacityOptions(ramType: string): string[] {
    if (ramType === 'DDR4') {
      return ['2GB', '4GB', '8GB', '16GB', '32GB'];
    } else if (ramType === 'DDR5') {
      return ['8GB', '16GB', '32GB', '64GB'];
    } else {
      return []; // Diğer türler için boş dizi döndür
    }
  }

  removeStock() {
    const whichId = this.selectedStockIdForRemove;
    console.log("Cope bastiktan sonra secilmis stock: ", whichId);
    this.stockService.removeSpecificStock(whichId).subscribe(
      (data) => {
        this.toastr.success("Stock succesfully removed.");        
      },
      (error) => {
        this.toastr.error("Stock can't removed.");        
      }
    );
  }


}

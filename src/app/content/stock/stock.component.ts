import { Component, OnInit } from '@angular/core';
import { StockService } from '../../service/stock/stock.service';
import { Stock } from '../../service/models/stock.models';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss'
})
export class StockComponent implements OnInit {

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

  selectedType: string = ''; // Initialize selected value
  constructor(private stockService: StockService) {}

  stock: Stock[] = [];
  ngOnInit(): void {
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

  selectStock(index: number) {
      this.selectedStock = this.stock[index];      
  }

  onTypeChange(event: any) {
    this.selectedType = event.target.value;    
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


}

import { Component, OnInit } from '@angular/core';
import { StockAlertService } from '../../service/stockalert/stockalert.service';
import { RequestStockAlert, StockAlert } from '../../service/models/stockalert.model';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-stockalert',
  templateUrl: './stockalert.component.html',
  styleUrl: './stockalert.component.scss'
})
export class StockalertComponent implements OnInit {
  typeOptions: { value: string; label: string }[] = [
    { value: 'addStockAlert', label: 'Stok Uyarısı Ekle' },    
    // Add more options as needed
  ];

  stockAlert: RequestStockAlert = {
    stockId: 0,
    alertQuantity: 0
    
  };

  stockAlertForm = new FormGroup({
    stockId: new FormControl(0),
    stockAlertQuantity: new FormControl(0)    
  });

  onTypeChange(event: any) {
    this.selectedType = event.target.value;    
  }

  selectedType: string = '';

  constructor(
    private stockAlertService: StockAlertService,
    private toastr: ToastrService

  ) {}

  stockAlerts: StockAlert[] = [];
  ngOnInit(): void {
    this.stockAlertService.getAllStockAlerts().subscribe({
      next: (data: StockAlert[]) => {
        this.stockAlerts = data;              
      },
      error: (error) => {
        this.toastr.error('Stok uyarıları alınırken hata oluştu. Lütfen daha sonra tekrar deneyin.');
      }
    });
}

  selectedStockAlert: any; // Seçilen stokun verilerini tutmak için bir değişken
  selectedStockAlertIdForRemove: any;

  selectStockAlert(index: number) {
    this.selectedStockAlert = this.stockAlerts[index];
    this.selectedStockAlertIdForRemove = this.stockAlerts[index].id;    
  }

  removeStockAlert(): void {    
    this.stockAlertService.removeStockAlert(this.selectedStockAlertIdForRemove).subscribe({
      next: (data: any) => {
        this.toastr.success('Stok Uyarısı başarıyla kaldırıldı');
      },
      error: (error: any) => {
        this.toastr.error('Stok uyarısı kaldırılırken hata oluştu. Lütfen daha sonra tekrar deneyin.');        
      }
    });
}

addStockAlert(stockAlert: RequestStockAlert): void {    
  this.stockAlertService.addStockAlert(stockAlert.stockId, stockAlert.alertQuantity).subscribe({
    next: (data: any) => {
      this.toastr.success('Stok Uyarısı başarıyla eklendi');
    },
    error: (error: any) => {
      this.toastr.error('Stok uyarısı eklenirken hata oluştu. Lütfen daha sonra tekrar deneyin.');        
    }
  });
}

  saveStockAlert(): void {        
    const stockIdControl = this.stockAlertForm.get('stockId');
    const stockAlertQuantityControl = this.stockAlertForm.get('stockAlertQuantity');    
    
    const stockIdValue = stockIdControl !== null ? (stockIdControl.value !== null ? stockIdControl.value : 0) : 0;
    const stockAlertQuantityValue = stockAlertQuantityControl !== null ? (stockAlertQuantityControl.value !== null ? stockAlertQuantityControl.value : 0) : 0;

    const isStockIdValid = stockIdControl !== null && stockIdValue !== 0;
    const isStockAlertQuantityValid = stockAlertQuantityControl !== null && stockAlertQuantityValue !== 0;

    
    const isAllValid = isStockIdValid && isStockAlertQuantityValid;
    
    if (isAllValid) {
      // Tüm form elemanlarının değerleri geçerli
      this.stockAlert.alertQuantity = stockAlertQuantityValue;
      this.stockAlert.stockId = stockIdValue;      
      this.addStockAlert(this.stockAlert);
    } else {
      // En az bir form elemanının değeri geçerli değil
      alert("Bütün alanları doldurun.");
    }
        

  }

}

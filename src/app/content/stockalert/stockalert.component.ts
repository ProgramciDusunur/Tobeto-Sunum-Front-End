import { Component, OnInit } from '@angular/core';
import { StockalertService } from '../../service/stockalert/stockalert.service';
import { StockAlert } from '../../service/models/stockalert.model';

@Component({
  selector: 'app-stockalert',
  templateUrl: './stockalert.component.html',
  styleUrl: './stockalert.component.scss'
})
export class StockalertComponent implements OnInit {
  constructor(private stockAlertService: StockalertService) {}

  stockAlerts: StockAlert[] = [];
  ngOnInit(): void {
    this.stockAlertService.getAllStockAlerts().subscribe(
      (data: StockAlert[]) => {
        this.stockAlerts = data;              
      },
      (error) => {
        console.error('Error fetching shelves:', error);
      }
    );
  }

}

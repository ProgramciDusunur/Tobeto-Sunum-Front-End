// Interface tanımı
export interface StockAlert {
    id: number;
    alertQuantity: number;
    stockId: number;
    // Diğer özellikler...
  }

  // Interface tanımı
export interface RequestStockAlert {
  stockId: number;  
  alertQuantity: number;  
  // Diğer özellikler...
}
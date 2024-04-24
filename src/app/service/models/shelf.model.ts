// Interface tanımı
export interface Shelf {
    id: number;
    occupiedQuantity: number;
    stockId: number;
    // Diğer özellikler...
}

// Interface tanımı
export interface RequestShelf {  
  stockId: number;
  occupiedQuantity: number;  
  // Diğer özellikler...
}
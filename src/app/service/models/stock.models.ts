// Interface tanımı
export interface Stock {
    id: number;
    type: string;
    quantity: number;
    typeId: number;
    // Diğer özellikler...
  }

  export interface EditStock {
    id: number;
    quantity: number;

    // Diğer özellikler...
  }
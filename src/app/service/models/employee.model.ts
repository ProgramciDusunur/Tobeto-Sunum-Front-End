// Interface tanımı
export interface Employee {
    id: number;
    name: string;
    surname: string;
    email: string;
    role: string;
    // Diğer özellikler...
  }

// Interface tanımı
export interface RequestEmployee {
  password: any;
  name: any;
  surname: any;
  email: any;
  role: any;
  // Diğer özellikler...
}
import { Component, OnInit } from '@angular/core';
import { StockService } from '../../service/stock/stock.service';
import { EditStock, Stock } from '../../service/models/stock.models';
import { ToastrService } from 'ngx-toastr';
import { TypeService } from '../../service/type/type.service';
import { Cpu, CpuCooler, DesktopCase, Gpu, Motherboard, Psu, Ram } from '../../service/models/type.model';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../service/login/login.service';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { Observable, catchError, forkJoin, map, of } from 'rxjs';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss'
})
export class StockComponent implements OnInit {
  processOptions: { value: string; label: string }[] = [
    { value: 'Add Product', label: 'Add Product' }  
    // Add more options as needed
  ];

  componentTypeOptions: { value: string; label: string }[] = [
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
    private typeService: TypeService,
    private loginService: LoginService,
    private fb: FormBuilder,    
  ) {}

  userRole: string = "";

  

  stock: Stock[] = [];
  stockModels: string[] = [];
  ngOnInit(): void {
    this.fetchStocks();        
    this.userRole = this.loginService.rol;
  }


  getTurkishType(type: string): string {
    switch (type) {
      case 'psu':
        return 'Guc Kaynagi';
      case 'ram':
        return 'Bellek';
      case 'motherboard':
        return 'Anakart';
      case 'desktopCase':
        return 'Masaustu Kasa';
      case 'cpuCooler':
        return 'Islemci Sogutucusu';
      case 'cpu':
        return 'Islemci';
      case 'gpu':
        return 'Ekran Karti';
      default:
        return type; // Eğer Türkçe karşılığı bilinmiyorsa orijinal değeri döndür
    }
  }

  canEditComputerComponent(): boolean {
    return this.userRole === 'admin';
  }
  

  fetchStocks(): void {
    this.stockService.getAllStocks().subscribe({
      next: (data: Stock[]) => {
        this.stock = data;   
        this.fetchStockModels();      
      },
      error: (error) => {
        this.toastr.error('Stoklar alınırken hata oluştu. Lütfen daha sonra tekrar deneyin.');
      }
    });
  }

  fetchStockModels(): void {
    // Boş bir dizi oluşturun
    this.stockModels = [];
  
    // Her bir stok öğesini işleyin
    this.stock.forEach((stockItem, index) => {
      // Her bir stok öğesinin tipi ve typeId bilgisini kullanarak model bilgisini alın
      console.log("Parçanın tipi: " + stockItem.type);
      if (stockItem.type === "cpu") {
        this.getCpuModel(stockItem.typeId).subscribe((model: string) => {
          // Model bilgisini doğru index'e ekleyin
          this.stockModels[index] = model;          
        });
      } else if (stockItem.type === "gpu") {
        this.getGpuModel(stockItem.typeId).subscribe((model: string) => {
          // Model bilgisini doğru index'e ekleyin
          this.stockModels[index] = model;          
        });
      } else if (stockItem.type === "psu") {
        this.getPsuModel(stockItem.typeId).subscribe((model: string) => {
          // Model bilgisini doğru index'e ekleyin
          this.stockModels[index] = model;          
        });
      } else if (stockItem.type === "ram") {
        this.getRamModel(stockItem.typeId).subscribe((model: string) => {
          // Model bilgisini doğru index'e ekleyin
          this.stockModels[index] = model;          
        });
      } else if (stockItem.type === "cpuCooler") {
        this.getCpuCoolerModel(stockItem.typeId).subscribe((model: string) => {
          // Model bilgisini doğru index'e ekleyin
          this.stockModels[index] = model;          
        });
      } else if (stockItem.type === "motherboard") {
        this.getMotherboardModel(stockItem.typeId).subscribe((model: string) => {
          // Model bilgisini doğru index'e ekleyin
          this.stockModels[index] = model;          
        });
      } else if (stockItem.type === "desktopCase") {
        this.getDesktopCaseModel(stockItem.typeId).subscribe((model: string) => {
          // Model bilgisini doğru index'e ekleyin
          this.stockModels[index] = model;          
        });
      }      
    });
  
    // Tüm model bilgilerini alana kadar bekleyin
    forkJoin(this.stockModels).subscribe(() => {
      // Tüm model bilgileri alındığında işlem yapabilirsiniz
      console.log("Tüm model bilgileri alındı:", this.stockModels);
    });
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
        this.resetSelectedType();
    }
  }

  resetSelectedType() {
    this.selectedType = '';
  }
  

  removeStock() {
    const whichId = this.selectedStockIdForRemove;    
    this.stockService.removeSpecificStock(whichId).subscribe({
      next: (data) => {
        this.toastr.success("Stok başarıyla kaldırıldı.");
      },
      error: (error) => {
        this.toastr.error("Stok kaldırılırken hata oluştu. Lütfen daha sonra tekrar deneyin.");
      }
    });
}

  addStock(stock: Stock) {
    this.stockService.addStock(stock).subscribe({
      next: (data) => {        
        this.toastr.info("Stok başarıyla eklendi.");
      },
      error: (error) => {
        this.toastr.error("Stok eklemesi başarısız.");
      }
    });   
  }

  editStock(stock: EditStock) {
    this.stockService.editStock(stock).subscribe(
      {
        next: (data) => {        
          this.toastr.info("Stok başarıyla düzenlendi.");
        },
        error: (error) => {
          this.toastr.error("Stok düzenlemesi başarısız.");
        }
      });
  }


  typeStock: Stock = {
    id: 0,
    type: '',
    quantity: 0,
    typeId: 0
  }

  editStockInfo: EditStock = {
    id: 0,
    quantity: 0,
  }

  /**********************************\
   ==================================

                 CPU

   ==================================
  \**********************************/


  cpuInfo: Cpu = {
    id: 0,
    brand: "",
    clockSpeed: 0,
    socketType: "",
    generation: "",  
    series: "",
    coreCount: 0,
    model: ""  
  }

  cpuForm = this.fb.nonNullable.group({
    brand: ["",[Validators.required]],
    model: ["",[Validators.required]],
    clockSpeed: [0,[Validators.required]],
    socketType: ["",[Validators.required]],
    generation: ["",[Validators.required]],
    series: ["",[Validators.required]],
    coreCount: [0,[Validators.required,Validators.min(1)]],
    quantity: [0,[Validators.required]]
  });

  cpuEditForm = this.fb.nonNullable.group({
    brand: ["",[Validators.required]],
    model: ["",[Validators.required]],
    clockSpeed: [0,[Validators.required]],
    socketType: ["",[Validators.required]],
    generation: ["",[Validators.required]],
    series: ["",[Validators.required]],
    coreCount: [0,[Validators.required,Validators.min(1)]],
    quantity: [0,[Validators.required]]
  });

  getCpu(cpuId: number) {    
    this.typeService.getCpu(cpuId).subscribe({
      next: (data) => {
        this.cpuInfo = data;        
        
        this.toastr.info("İşlemci bilgisi başarıyla alındı.");        
      },
      error: (error) => {
        this.toastr.error("İşlemci bilgisi alınamadı.");          
      }
    });
  }

  addCpu(cpu: Cpu, quantity: number) {
    this.typeService.addCpu(cpu).subscribe({
      next: (data) => {
        this.cpuInfo = data;
        this.typeStock.typeId = data.id;    
        this.typeStock.type = "cpu";
        this.typeStock.quantity = quantity;        
        this.addStock(this.typeStock);        
        this.toastr.info("İşlemci başarıyla eklendi.");
      },
      error: (error) => {
        this.toastr.error("İşlemci eklemesi başarısız.");
      }
    });    
  }
  editCpu(cpu: Cpu, quantity: number) {
    this.typeService.editCpu(cpu).subscribe({
      next: (data) => {
        this.cpuInfo = data;
        this.editStockInfo.id = this.selectedStockIdForRemove;    
        this.editStockInfo.quantity = quantity;        
        this.editStock(this.editStockInfo);        
        this.toastr.info("İşlemci başarıyla düzenlendi.");
      },
      error: (error) => {
        this.toastr.error("İşlemci düzenlenmesi başarısız.");
      }
    });    

  }
  
  cpuAddFormCheck() {
    if (this.cpuForm.valid ) {
      // Tüm form elemanlarının değerleri geçerli
      this.cpuInfo.brand = this.cpuForm.get('brand')!.value;
      this.cpuInfo.clockSpeed = this.cpuForm.get('clockSpeed')!.value;
      this.cpuInfo.coreCount = this.cpuForm.get('coreCount')!.value;
      this.cpuInfo.generation = this.cpuForm.get('generation')!.value;
      this.cpuInfo.model = this.cpuForm.get('model')!.value;
      this.cpuInfo.series = this.cpuForm.get('series')!.value;
      this.cpuInfo.socketType = this.cpuForm.get('socketType')!.value;
      const stockQuantity = this.cpuForm.get('quantity')!.value;
      this.addCpu(this.cpuInfo, stockQuantity);
    } else {
      // En az bir form elemanının değeri geçerli değil
      alert("Bütün alanları doldurun.");
    }
  }

  cpuEditFormCheck() {
    if (this.cpuEditForm.valid) {
      // Tüm form elemanlarının değerleri geçerli
      this.cpuInfo.brand = this.cpuEditForm.get('brand')!.value;
      this.cpuInfo.clockSpeed = this.cpuEditForm.get('clockSpeed')!.value;
      this.cpuInfo.coreCount = this.cpuEditForm.get('coreCount')!.value;
      this.cpuInfo.generation = this.cpuEditForm.get('generation')!.value;
      this.cpuInfo.model = this.cpuEditForm.get('model')!.value;
      this.cpuInfo.series = this.cpuEditForm.get('series')!.value;
      this.cpuInfo.socketType = this.cpuEditForm.get('socketType')!.value;
      this.cpuInfo.id = this.selectedStock.typeId;
      const stockQuantity = this.cpuEditForm.get('quantity')!.value;
      this.editCpu(this.cpuInfo, stockQuantity);
      alert("heyyo çalıştı")
    } else {
      // En az bir form elemanının değeri geçerli değil
      alert("Bütün alanları doldurun.");
    }

  }


  /**********************************\
   ==================================

              CPU Cooler

   ==================================
  \**********************************/


  cpuCoolerInfo: CpuCooler = {
    id: 0,
    type: '',
    fanLength: '',
    rpm: 0,
    material: '',
    led: '',
    brand: '',
    model: ''
  }

  cpuCoolerForm = this.fb.nonNullable.group({
    brand: ["",[Validators.required]],
    model: ["",[Validators.required]],
    fanLength: ["",[Validators.required]],
    led: ["",[Validators.required]],
    rpm: [0,[Validators.required]],
    material: ["",[Validators.required]],
    type: ["",[Validators.required]],
    quantity: [0,[Validators.required]]
  });

  cpuCoolerEditForm = this.fb.nonNullable.group({
    brand: ["",[Validators.required]],
    model: ["",[Validators.required]],
    fanLength: ["",[Validators.required]],
    led: ["",[Validators.required]],
    rpm: [0,[Validators.required]],
    material: ["",[Validators.required]],
    type: ["",[Validators.required]],
    quantity: [0,[Validators.required]]
  });

 
  getCpuCooler(cpuCoolerId: number) {    
    this.typeService.getCpuCooler(cpuCoolerId).subscribe({
      next: (data) => {
        this.cpuCoolerInfo = data;        
        this.toastr.info("Soğutucu bilgisi başarıyla alındı.");        
      },
      error: (error) => {
        this.toastr.error("Soğutucu bilgisi alınamadı.");          
      }
    });
}

addCpuCooler(cpuCooler: CpuCooler, quantity: number) {
  this.typeService.addCpuCooler(cpuCooler).subscribe({
    next: (data) => {
      this.cpuCoolerInfo = data;
      this.typeStock.typeId = data.id;    
      this.typeStock.type = "cpuCooler";
      this.typeStock.quantity = quantity;        
      this.addStock(this.typeStock);      
      this.toastr.info("CPU soğutucusu başarıyla eklendi.");
    },
    error: (error) => {
      this.toastr.error("CPU soğutucusu eklemesi başarısız.");
    }
  });    
}

editCpuCooler(cpuCooler: CpuCooler, quantity: number) {
  this.typeService.editCpuCooler(cpuCooler).subscribe({
    next: (data) => {
      this.cpuCoolerInfo = data;
      this.editStockInfo.id = this.selectedStockIdForRemove;    
      this.editStockInfo.quantity = quantity;        
      this.editStock(this.editStockInfo);      
      this.toastr.info("CPU soğutucusu düzenlendi.");
    },
    error: (error) => {
      this.toastr.error("CPU soğutucusu başarısız.");
    }
  });    

}

cpuCoolerAddFormCheck() {
  if (this.cpuCoolerForm.valid) {
    // Tüm form elemanlarının değerleri geçerli
    this.cpuCoolerInfo.brand = this.cpuCoolerForm.get('brand')!.value;;
    this.cpuCoolerInfo.fanLength = this.cpuCoolerForm.get('fanLength')!.value;;
    this.cpuCoolerInfo.led =  this.cpuCoolerForm.get('led')!.value;;
    this.cpuCoolerInfo.material = this.cpuCoolerForm.get('material')!.value;;
    this.cpuCoolerInfo.model = this.cpuCoolerForm.get('model')!.value;;
    this.cpuCoolerInfo.rpm = this.cpuCoolerForm.get('rpm')!.value;;  
    this.cpuCoolerInfo.type = this.cpuCoolerForm.get('type')!.value;;
    const stockQuantity = this.cpuCoolerForm.get('quantity')!.value;;
     
    this.addCpuCooler(this.cpuCoolerInfo, stockQuantity);
  } else {
    // En az bir form elemanının değeri geçerli değil
    alert("Bütün alanları doldurun.");
  }
}

cpuCoolerEditFormCheck() {
  if (this.cpuCoolerForm.valid) {
    // Tüm form elemanlarının değerleri geçerli
    this.cpuCoolerInfo.brand = this.cpuCoolerEditForm.get('brand')!.value;
    this.cpuCoolerInfo.fanLength = this.cpuCoolerEditForm.get('fanLength')!.value;
    this.cpuCoolerInfo.led = this.cpuCoolerEditForm.get('led')!.value; 
    this.cpuCoolerInfo.material = this.cpuCoolerEditForm.get('material')!.value;
    this.cpuCoolerInfo.model = this.cpuCoolerEditForm.get('model')!.value;
    this.cpuCoolerInfo.rpm = this.cpuCoolerEditForm.get('rpm')!.value; 
    this.cpuCoolerInfo.type = this.cpuCoolerEditForm.get('type')!.value;
    const stockQuantity = this.cpuCoolerEditForm.get('quantity')!.value;   
    this.editCpuCooler(this.cpuCoolerInfo, stockQuantity);
  } else {
    // En az bir form elemanının değeri geçerli değil
    alert("Bütün alanları doldurun.");
  }
}




  /**********************************\
   ==================================

                 GPU

   ==================================
  \**********************************/

  gpuInfo: Gpu = {
    id: 0,
    brand: "",
    producer: "",
    series: "",
    model: "",      
    vram: 0,
    memoryInterface: 0
    
  }

  gpuForm = this.fb.nonNullable.group({
    brand: ["",[Validators.required]],
    model: ["",[Validators.required]],
    producer: ["",[Validators.required]],
    series: ["",[Validators.required]],
    vram: [0,[Validators.required]],
    memoryInterface: [0,[Validators.required]],
    quantity: [0,[Validators.required]]   
  });

  gpuEditForm = this.fb.nonNullable.group({
    brand: ["",[Validators.required]],
    model: ["",[Validators.required]],
    producer: ["",[Validators.required]],
    series: ["",[Validators.required]],
    vram: [0,[Validators.required]],
    memoryInterface: [0,[Validators.required]],
    quantity:[0,[Validators.required]] 
  });



  getGpu(gpuId: number) {    
    this.typeService.getGpu(gpuId).subscribe({
      next: (data) => {
        this.gpuInfo = data;        
        this.toastr.info("Ekran Kartı bilgisi başarıyla alındı.");        
      },
      error: (error) => {
        this.toastr.error("Ekran Kartı bilgisi alınamadı.");          
      }
    });
  }

  addGpu(gpu: Gpu, quantity: number) {
    this.typeService.addGpu(gpu).subscribe({
      next: (data) => {
        this.gpuInfo = data;
        this.typeStock.typeId = data.id;    
        this.typeStock.type = "gpu";
        this.typeStock.quantity = quantity;        
        this.addStock(this.typeStock);        
        this.toastr.info("Ekran kartı başarıyla eklendi.");
      },
      error: (error) => {
        this.toastr.error("Ekran kartı eklemesi başarısız.");
      }
    });    
  }
  editGpu(gpu: Gpu, quantity: number) {
    this.typeService.editGpu(gpu).subscribe({
      next: (data) => {
        this.gpuInfo = data;
        this.editStockInfo.id = this.selectedStockIdForRemove;    
        this.editStockInfo.quantity = quantity;        
        this.editStock(this.editStockInfo);        
        this.toastr.info("Ekran kartı başarıyla düzenlendi.");
      },
      error: (error) => {
        this.toastr.error("Ekran kartı düzenlenmesi başarısız.");
      }
    });    
  
  }
  
  gpuAddFormCheck() {
    if (this.gpuForm.valid) {
      // Tüm form elemanlarının değerleri geçerli
      this.gpuInfo.brand = this.gpuForm.get('brand')!.value;
      this.gpuInfo.model = this.gpuForm.get('model')!.value;
      this.gpuInfo.producer = this.gpuForm.get('producer')!.value; 
      this.gpuInfo.series = this.gpuForm.get('series')!.value;
      this.gpuInfo.vram = this.gpuForm.get('vram')!.value;   
      this.gpuInfo.memoryInterface = this.gpuForm.get('memoryInterface')!.value;   
      const stockQuantity = this.gpuForm.get('quantity')!.value;
      this.addGpu(this.gpuInfo, stockQuantity);
    } else {
      // En az bir form elemanının değeri geçerli değil
      alert("Bütün alanları doldurun.");
    }
  }

  gpuEditFormCheck() {
    if (this.gpuForm.valid) {
      // Tüm form elemanlarının değerleri geçerli
      this.gpuInfo.brand = this.gpuEditForm.get('brand')!.value;
      this.gpuInfo.model = this.gpuEditForm.get('model')!.value;
      this.gpuInfo.producer = this.gpuEditForm.get('producer')!.value;
      this.gpuInfo.series = this.gpuEditForm.get('series')!.value;
      this.gpuInfo.vram =this.gpuEditForm.get('vram')!.value;    
      this.gpuInfo.memoryInterface =this.gpuEditForm.get('memoryInterface')!.value;    
      const stockQuantity = this.gpuEditForm.get('quantity')!.value;
      this.editGpu(this.gpuInfo, stockQuantity);
    } else {
      // En az bir form elemanının değeri geçerli değil
      alert("Bütün alanları doldurun.");
    }
  }



  /**********************************\
   ==================================

                 PSU

   ==================================
  \**********************************/

  psuInfo: Psu = {
    id: 0,
    watt: 0,
    efficiency: "",
    modular: false,
    type: "",      
    pcieGen5Support: false,
    brand: "",
    model: ""
  }

  psuForm = this.fb.nonNullable.group({
    watt:[0,[Validators.required]],
    efficiency: ["",[Validators.required]],
    modular: [false,[Validators.required]],
    type: ["",[Validators.required]],
    pcieGen5Support: [false,[Validators.required]],
    brand: ["",[Validators.required]],
    model: ["",[Validators.required]],
    quantity:[0,[Validators.required]]    
  });
  psuEditForm = this.fb.nonNullable.group({
    watt: [0,[Validators.required]],
    efficiency: ["",[Validators.required]],
    modular: [false,[Validators.required]],
    type: ["",[Validators.required]],
    pcieGen5Support: [false,[Validators.required]],
    brand: ["",[Validators.required]],
    model: ["",[Validators.required]],
    quantity: [0,[Validators.required]]     
  });


  getPsu(psuId: number) {    
    this.typeService.getPsu(psuId).subscribe({
      next: (data) => {
        this.psuInfo = data;
        
        this.toastr.info("Güç Kaynağı bilgisi başarıyla alındı.");        
      },
      error: (error) => {
        this.toastr.error("Güç Kaynağı bilgisi alınamadı.");          
      }
    });
  }

  addPsu(psu: Psu, quantity: number) {
    this.typeService.addPsu(psu).subscribe({
      next: (data) => {
        this.psuInfo = data;
        this.typeStock.typeId = data.id;    
        this.typeStock.type = "psu";
        this.typeStock.quantity = quantity;        
        this.addStock(this.typeStock);        
        this.toastr.info("Güç kaynağı başarıyla eklendi.");
      },
      error: (error) => {
        this.toastr.error("Güç kaynağı eklemesi başarısız.");
      }
    });    
  }

  editPsu(psu: Psu, quantity: number) {
    this.typeService.editPsu(psu).subscribe({
      next: (data) => {
        this.psuInfo = data;
        this.editStockInfo.id = this.selectedStockIdForRemove;    
        this.editStockInfo.quantity = quantity;        
        this.editStock(this.editStockInfo);        
        this.toastr.info("Güç kaynağı başarıyla düzenlendi.");
      },
      error: (error) => {
        this.toastr.error("Güç kaynağı düzenlenmesi başarısız.");
      }
    });    
  
  }
  
  psuAddFormCheck() {
    if (this.psuForm.valid) {
      // Tüm form elemanlarının değerleri geçerli
      this.psuInfo.watt = this.psuForm.get('watt')!.value;
      this.psuInfo.efficiency = this.psuForm.get('efficiency')!.value;
      this.psuInfo.modular = this.psuForm.get('modular')!.value; 
      this.psuInfo.type = this.psuForm.get('type')!.value; 
      this.psuInfo.pcieGen5Support =this.psuForm.get('pcieGen5Support')!.value;   
      this.psuInfo.brand = this.psuForm.get('brand')!.value;
      this.psuInfo.model = this.psuForm.get('model')!.value;
      const stockQuantity =  this.psuForm.get('quantity')!.value;
      this.addPsu(this.psuInfo, stockQuantity);
    } else {
      // En az bir form elemanının değeri geçerli değil
      alert("Bütün alanları doldurun.");
    }
  }


  psuEditFormCheck() {
    if (this.psuForm.valid) {
      // Tüm form elemanlarının değerleri geçerli
      this.psuInfo.watt = this.psuEditForm.get('watt')!.value;
      this.psuInfo.efficiency = this.psuEditForm.get('efficiency')!.value;
      this.psuInfo.modular = this.psuEditForm.get('modular')!.value;  
      this.psuInfo.type = this.psuEditForm.get('type')!.value;  
      this.psuInfo.pcieGen5Support = this.psuEditForm.get('pcieGen5Support')!.value;   
      this.psuInfo.brand = this.psuEditForm.get('brand')!.value;
      this.psuInfo.model =this.psuEditForm.get('model')!.value;
      const stockQuantity =  this.psuEditForm.get('quantity')!.value;
      this.editPsu(this.psuInfo, stockQuantity);
    } else {
      // En az bir form elemanının değeri geçerli değil
      alert("Bütün alanları doldurun.");
    }
  }

  
  



  /**********************************\
   ==================================

                 RAM

   ==================================
  \**********************************/

  ramInfo: Ram = {
    id: 0,
    type: '',
    capacity: 0,
    frequencySpeed: 0,
    channelType: '',
    compatibility: '',
    brand: '',
    model: ''
  }

  ramForm = this.fb.nonNullable.group({
    type: ["",[Validators.required]],
    capacity:[0,[Validators.required]],
    frequencySpeed: [0,[Validators.required]],
    channelType: ["",[Validators.required]],
    compatibility: ["",[Validators.required]],
    brand: ["",[Validators.required]],
    model: ["",[Validators.required]],
    quantity:[0,[Validators.required]]        
  });

  ramEditForm = this.fb.nonNullable.group({
    type: ["",[Validators.required]],
    capacity:[0,[Validators.required]],
    frequencySpeed: [0,[Validators.required]],
    channelType: ["",[Validators.required]],
    compatibility:["",[Validators.required]],
    brand: ["",[Validators.required]],
    model: ["",[Validators.required]],
    quantity: [0,[Validators.required]]         
  });

  getRam(ramId: number) {    
    this.typeService.getRam(ramId).subscribe({
      next: (data) => {
        this.ramInfo = data;        
        this.toastr.info("RAM bilgisi başarıyla alındı.");        
      },
      error: (error) => {
        this.toastr.error("RAM bilgisi alınamadı.");          
      }
    });
  }

  addRam(ram: Ram, quantity: number) {
    this.typeService.addRam(ram).subscribe({
      next: (data) => {
        this.ramInfo = data;
        this.typeStock.typeId = data.id;    
        this.typeStock.type = "ram";
        this.typeStock.quantity = quantity;        
        this.addStock(this.typeStock);        
        this.toastr.info("RAM başarıyla eklendi.");
      },
      error: (error) => {
        this.toastr.error("RAM eklemesi başarısız.");
      }
    });    
  }
  
  editRam(ram: Ram, quantity: number) {
    this.typeService.editRam(ram).subscribe({
      next: (data) => {
        this.ramInfo = data;
        this.editStockInfo.id = this.selectedStockIdForRemove;    
        this.editStockInfo.quantity = quantity;        
        this.editStock(this.editStockInfo);        
        this.toastr.info("RAM başarıyla düzenlendi.");
      },
      error: (error) => {
        this.toastr.error("RAM düzenlenmesi başarısız.");
      }
    });    
  
  }
  ramAddFormCheck() {
    if (this.ramForm.valid) {
      // Tüm form elemanlarının değerleri geçerli
      this.ramInfo.type = this.ramForm.get('type')!.value;
      this.ramInfo.capacity =this.ramForm.get('capacity')!.value;
      this.ramInfo.frequencySpeed = this.ramForm.get('frequencySpeed')!.value;    
      this.ramInfo.channelType = this.ramForm.get('channelType')!.value; 
      this.ramInfo.compatibility = this.ramForm.get('compatibility')!.value;   
      this.ramInfo.brand = this.ramForm.get('brand')!.value;
      this.ramInfo.model = this.ramForm.get('model')!.value;
      const stockQuantity = this.ramForm.get('quantity')!.value;
      this.addRam(this.ramInfo, stockQuantity);
    } else {
      // En az bir form elemanının değeri geçerli değil
      alert("Bütün alanları doldurun.");
    }
  }


  ramEditFormCheck() {
    if (this.ramForm.valid) {
      // Tüm form elemanlarının değerleri geçerli
      this.ramInfo.type = this.ramEditForm.get('type')!.value;
      this.ramInfo.capacity =  this.ramEditForm.get('capacity')!.value;
      this.ramInfo.frequencySpeed = this.ramEditForm.get('frequencySpeed')!.value;  
      this.ramInfo.channelType =  this.ramEditForm.get('channelType')!.value;   
      this.ramInfo.compatibility =this.ramEditForm.get('compatibility')!.value;   
      this.ramInfo.brand = this.ramEditForm.get('brand')!.value;
      this.ramInfo.model = this.ramEditForm.get('model')!.value;
      const stockQuantity =this.ramEditForm.get('quantity')!.value;
      this.editRam(this.ramInfo, stockQuantity);
    } else {
      // En az bir form elemanının değeri geçerli değil
      alert("Bütün alanları doldurun.");
    }
  }
 

  






  /**********************************\
   ==================================

              Motherboard

   ==================================
  \**********************************/

  motherboardInfo: Motherboard = {
    id: 0,
    cpuSocketType: '',
    cpuCompatibility: false,
    ramType: '',
    size: '',
    ramSlots: 0,
    brand: '',
    model: ''
  }

  motherboardForm = this.fb.nonNullable.group({
    brand: ["",[Validators.required]],
    size: ["",[Validators.required]],
    model: ["",[Validators.required]],
    ramType: ["",[Validators.required]],
    ramSlots: [0,[Validators.required]],
    cpuSocketType: ["",[Validators.required]],
    cpuCompatibility:["",[Validators.required]],
    quantity: [0,[Validators.required]],      
  });
  
  motherboardEditForm =this.fb.nonNullable.group({
    brand: ["",[Validators.required]],
    size: ["",[Validators.required]],
    model: ["",[Validators.required]],
    ramType:["",[Validators.required]],
    ramSlots: [0,[Validators.required]],
    cpuSocketType: ["",[Validators.required]],
    cpuCompatibility: ["",[Validators.required]],
    quantity: [0,[Validators.required]],          
  });

  getMotherboard(motherboardId: number) {    
    this.typeService.getMotherboard(motherboardId).subscribe({
      next: (data) => {
        this.motherboardInfo = data;        
        this.toastr.info("Anakart bilgisi başarıyla alındı.");        
      },
      error: (error) => {
        this.toastr.error("Anakart bilgisi alınamadı.");          
      }
    });
  }

  addMotherboard(motherboard: Motherboard, quantity: number) {
    this.typeService.addMotherboard(motherboard).subscribe({
      next: (data) => {
        this.motherboardInfo = data;
        this.typeStock.typeId = data.id;    
        this.typeStock.type = "motherboard";
        this.typeStock.quantity = quantity;        
        this.addStock(this.typeStock);        
        this.toastr.info("Anakart başarıyla eklendi.");
      },
      error: (error) => {
        this.toastr.error("Anakart eklemesi başarısız.");
      }
    });    
  }

  editMotherboard(motherboard: Motherboard, quantity: number) {
    this.typeService.editMotherboard(motherboard).subscribe({
      next: (data) => {
        this.motherboardInfo = data;
        this.editStockInfo.id = this.selectedStockIdForRemove;    
        this.editStockInfo.quantity = quantity;        
        this.editStock(this.editStockInfo);        
        this.toastr.info("Anakart başarıyla düzenlendi.");
      },
      error: (error) => {
        this.toastr.error("Anakart düzenlenmesi başarısız.");
      }
    });    
  
  }
  
  motherboardAddFormCheck() {
    if (this.motherboardForm.valid) {
      this.motherboardInfo.brand = this.motherboardForm.get('brand')!.value;
      this.motherboardInfo.size = this.motherboardForm.get('size')!.value;
      this.motherboardInfo.model = this.motherboardForm.get('model')!.value;   
      this.motherboardInfo.ramType = this.motherboardForm.get('ramType')!.value; 
      this.motherboardInfo.ramSlots =  this.motherboardForm.get('ramSlots')!.value; 
      this.motherboardInfo.cpuSocketType = this.motherboardForm.get('cpuSocketType')!.value;
      this.motherboardInfo.cpuCompatibility = this.motherboardForm.get('cpuCompatibility')!.value === 'INTEL' ? true : false;
      const stockQuantity = this.motherboardForm.get('quantity')!.value;
      this.addMotherboard(this.motherboardInfo, stockQuantity);
    } else {
      // En az bir form elemanının değeri geçerli değil
      alert("Bütün alanları doldurun.");
    }
  }


  motherboardEditFormCheck() {
    if (this.motherboardForm.valid) {
      this.motherboardInfo.brand = this.motherboardEditForm.get('brand')!.value;
      this.motherboardInfo.size = this.motherboardEditForm.get('size')!.value;
      this.motherboardInfo.model = this.motherboardEditForm.get('model')!.value;   
      this.motherboardInfo.ramType = this.motherboardEditForm.get('ramType')!.value; 
      this.motherboardInfo.ramSlots =  this.motherboardEditForm.get('ramSlots')!.value; 
      this.motherboardInfo.cpuSocketType = this.motherboardEditForm.get('cpuSocketType')!.value;
      this.motherboardInfo.cpuCompatibility = this.motherboardForm.get('cpuCompatibility')!.value === 'INTEL' ? true : false;
      const stockQuantity = this.motherboardEditForm.get('quantity')!.value;
      this.editMotherboard(this.motherboardInfo, stockQuantity);
    } else {
      // En az bir form elemanının değeri geçerli değil
      alert("Bütün alanları doldurun.");
    }
  }


  /**********************************\
   ==================================

              Desktop Case

   ==================================
  \**********************************/

  desktopCaseInfo: DesktopCase = {
    id: 0,
    brand: '',
    model: '',
    type: '',
    psu: false,
    psuLocation: '',
    transparent: false,
    psuWatt: 0
  }
  

  desktopCaseForm = this.fb.nonNullable.group({
    psu:["",[Validators.required]],
    psuLocation: ["",[Validators.required]],
    transparent: ["",[Validators.required]],
    psuWatt: [0,[Validators.required]],
    brand: ["",[Validators.required]],
    model:["",[Validators.required]],
    type:["",[Validators.required]],
    quantity: [0,[Validators.required]]   
  });

  desktopCaseEditForm = this.fb.nonNullable.group({
    psu:["",[Validators.required]],
    psuLocation:["",[Validators.required]],
    transparent: ["",[Validators.required]],
    psuWatt: [0,[Validators.required]],
    brand: ["",[Validators.required]],
    model:["",[Validators.required]],
    type:["",[Validators.required]],
    quantity:[0,[Validators.required]]
  });

  getDesktopCase(desktopCaseId: number) {
    this.typeService.getDesktopCase(desktopCaseId).subscribe({
      next: (data) => {
        this.desktopCaseInfo = data;        
        this.toastr.info("Kasa bilgisi başarıyla alındı.");
      },
      error: (error) => {
        this.toastr.error("Kasa bilgisi alınamadı.");
      }
    });    
  }
  
  addDesktopCase(desktopCase: DesktopCase, quantity: number) {
    this.typeService.addDesktopCase(desktopCase).subscribe({
      next: (data) => {
        this.desktopCaseInfo = data;
        this.typeStock.typeId = data.id;    
        this.typeStock.type = "desktopCase";
        this.typeStock.quantity = quantity;        
        this.addStock(this.typeStock);        
        this.toastr.info("Kasa başarıyla eklendi.");
      },
      error: (error) => {
        this.toastr.error("Kasa eklemesi başarısız.");
      }
    });    
  }
  editDesktopCase(desktopCase: DesktopCase, quantity: number) {
    this.typeService.editDesktopCase(desktopCase).subscribe({
      next: (data) => {
        this.desktopCaseInfo = data;
        this.editStockInfo.id = this.selectedStockIdForRemove;    
        this.editStockInfo.quantity = quantity;        
        this.editStock(this.editStockInfo);        
        this.toastr.info("Kasa bilgisi başarıyla düzenlendi.");
      },
      error: (error) => {
        this.toastr.error("Kasa bilgisidüzenlenmesi başarısız.");
      }
    });    
  
  }
  desktopCaseAddFormCheck() {
    if (this.desktopCaseForm.valid) {
      this.desktopCaseInfo.psu = this.desktopCaseForm.get('psu')!.value === 'VAR' ? true : false;
      this.desktopCaseInfo.psuLocation = this.desktopCaseForm.get('psuLocation')!.value;
      this.desktopCaseInfo.transparent =this.desktopCaseForm.get('transparent')!.value === 'EVET' ? true : false; 
      this.desktopCaseInfo.psuWatt = this.desktopCaseForm.get('psuWatt')!.value;   
      this.desktopCaseInfo.brand =  this.desktopCaseForm.get('brand')!.value;  
      this.desktopCaseInfo.model = this.desktopCaseForm.get('model')!.value;
      this.desktopCaseInfo.type =this.desktopCaseForm.get('type')!.value;
      const stockQuantity = this.desktopCaseForm.get('quantity')!.value;
      this.addDesktopCase(this.desktopCaseInfo, stockQuantity);
    } else {
      // En az bir form elemanının değeri geçerli değil
      alert("Bütün alanları doldurun.");
    }
  }
  
  desktopCaseEditFormCheck() {
    if (this.desktopCaseForm.valid) {
      this.desktopCaseInfo.psu = this.desktopCaseForm.get('psu')!.value === 'VAR' ? true : false;
      this.desktopCaseInfo.psuLocation = this.desktopCaseForm.get('psuLocation')!.value;
      this.desktopCaseInfo.transparent =this.desktopCaseForm.get('transparent')!.value === 'EVET' ? true : false; 
      this.desktopCaseInfo.psuWatt = this.desktopCaseForm.get('psuWatt')!.value;   
      this.desktopCaseInfo.brand =  this.desktopCaseForm.get('brand')!.value;  
      this.desktopCaseInfo.model = this.desktopCaseForm.get('model')!.value;
      this.desktopCaseInfo.type =this.desktopCaseForm.get('type')!.value;
      const stockQuantity = this.desktopCaseForm.get('quantity')!.value;
      this.editDesktopCase(this.desktopCaseInfo, stockQuantity);
    } else {
      // En az bir form elemanının değeri geçerli değil
      alert("Bütün alanları doldurun.");
    }
  }


  /**********************************\
   ==================================

             Type Operations

   ==================================
  \**********************************/

  selectedGlobalType: string = '';

  typeInformation(whichType: string, typeId: number) {
    this.selectedGlobalType = whichType;    
    if (whichType === "cpu") {
      this.getCpu(typeId);      

    } else if (whichType === "gpu") {
      this.getGpu(typeId);      

    } else if (whichType === "psu") {      
      this.getPsu(typeId);

    } else if (whichType === "cpuCooler") {      
      this.getCpuCooler(typeId);

    } else if (whichType === "motherboard") {
      this.getMotherboard(typeId);

    } else if (whichType === "ram") {
      this.getRam(typeId);

    } else if (whichType === "desktopCase") {
      this.getDesktopCase(typeId);
    }            
  }

  

  addProductAndStock() {    
    if (this.selectedProcess === "Add Product") {
      switch(this.selectedType) {
        case "CPU":          
          this.cpuAddFormCheck();
        break;

        case "GPU":          
          this.gpuAddFormCheck();
        break;

        case "RAM":          
          this.ramAddFormCheck();
        break;

        case "PSU":          
          this.psuAddFormCheck();
        break;

        case "Motherboard":          
          this.motherboardAddFormCheck();
        break;

        case "Computer Case":          
          this.desktopCaseAddFormCheck();
        break;

        case "CPU Cooler":          
          this.cpuCoolerAddFormCheck();
        break;
        
      }      
    }
  }

  editProductAndStock() {
    alert(this.selectedGlobalType);
    switch(this.selectedGlobalType) {
      case "cpu":        
        this.cpuEditFormCheck();
      break;

      case "gpu":        
        this.gpuEditFormCheck();
      break;

      case "ram":        
        this.ramEditFormCheck();
      break;

      case "psu":        
        this.psuEditFormCheck();
      break;

      case "motherboard":        
        this.motherboardEditFormCheck();
      break;


      case "desktopCase":        
        this.desktopCaseEditFormCheck();
      break;

      case "cpuCooler":        
        this.cpuCoolerEditFormCheck();
      break;
      
    }
  }
  cpuModel: any = '';
  
  generatePDF() {
    const doc = new jsPDF();    
    // Text eklemesi
    doc.text('Hello World', 40, 10);

    // Tablo oluşturma
    autoTable(doc, {
        head: [['Stok ID', 'Parça', 'Sayisi', 'Model']],
        body: this.stock.map((item, index) => [item.id, this.getTurkishType(item.type), item.quantity, this.stockModels[index]]),
        // Tema ayarları
        theme: 'grid', // Striped tema
        styles: {
            // Tablo stil ayarları
            fontSize: 12, // Yazı boyutu
            fontStyle: 'normal', // Yazı stili
            font: 'helvetica', // Yazı tipi            
        },
        // Tablo hücreleri için padding ayarları
        margin: { top: 20, right: 10, bottom: 10, left: 10 }, // Kenar boşlukları
        bodyStyles: { textColor: [0, 0, 0], fontSize: 10 }, // Yazı rengi ve boyutu
        alternateRowStyles: { fillColor: [240, 240, 240] }, // Sıralar arası arkaplan renkleri
        columnStyles: { 0: { cellWidth: 40 }, 1: { cellWidth: 50 }, 2: { cellWidth: 50 } } // Sütun genişlikleri
    });

    // PDF'i kaydetme
    doc.save('table.pdf');
}





getCpuModel(cpuId: number): Observable<string> {    
    return this.typeService.getCpu(cpuId).pipe(
        map((data: any) => {
            const cpuModel = data.model; // response içindeki model değerini cpuModel değişkenine ata
            
            return cpuModel; // cpuModel değerini döndür
        }),
        catchError(error => {            
            return of(""); // Hata durumunda boş bir string döndür
        })
    );
}

getGpuModel(gpuId: number): Observable<string> {    
  return this.typeService.getGpu(gpuId).pipe(
      map((data: any) => {
          const gpuModel = data.model; // response içindeki model değerini cpuModel değişkenine ata          
          return gpuModel; // cpuModel değerini döndür
      }),
      catchError(error => {          
          return of(""); // Hata durumunda boş bir string döndür
      })
  );
}

getPsuModel(psuId: number): Observable<string> {    
  return this.typeService.getPsu(psuId).pipe(
      map((data: any) => {
          const psuModel = data.model; // response içindeki model değerini cpuModel değişkenine ata          
          return psuModel; // cpuModel değerini döndür
      }),
      catchError(error => {          
          return of(""); // Hata durumunda boş bir string döndür
      })
  );
}

getRamModel(ramId: number): Observable<string> {    
  return this.typeService.getRam(ramId).pipe(
      map((data: any) => {
          const ramModel = data.model; // response içindeki model değerini cpuModel değişkenine ata          
          return ramModel; // cpuModel değerini döndür
      }),
      catchError(error => {          
          return of(""); // Hata durumunda boş bir string döndür
      })
  );
}

getCpuCoolerModel(cpuCoolerId: number): Observable<string> {    
  return this.typeService.getCpuCooler(cpuCoolerId).pipe(
      map((data: any) => {
          const cpuCoolerModel = data.model; // response içindeki model değerini cpuModel değişkenine ata          
          return cpuCoolerModel; // cpuModel değerini döndür
      }),
      catchError(error => {          
          return of(""); // Hata durumunda boş bir string döndür
      })
  );
}

getDesktopCaseModel(desktopCaseId: number): Observable<string> {    
  return this.typeService.getDesktopCase(desktopCaseId).pipe(
      map((data: any) => {
          const desktopCaseModel = data.model; // response içindeki model değerini cpuModel değişkenine ata          
          return desktopCaseModel; // cpuModel değerini döndür
      }),
      catchError(error => {          
          return of(""); // Hata durumunda boş bir string döndür
      })
  );
}

getMotherboardModel(motherboardId: number): Observable<string> {    
  return this.typeService.getMotherboard(motherboardId).pipe(
      map((data: any) => {
          const motherboardModel = data.model; // response içindeki model değerini cpuModel değişkenine ata          
          return motherboardModel; // cpuModel değerini döndür
      }),
      catchError(error => {          
          return of(""); // Hata durumunda boş bir string döndür
      })
  );
}




async getComponentModelForPdf(type: string, typeId: number): Promise<string> {
  if (type === "cpu") {        
    this.cpuModel = await this.getCpuModel(typeId).toPromise();
    console.log("İçerideki model: " + this.cpuModel);
    return this.cpuModel;
  } else if (type === "gpu") {
    return this.gpuInfo.model;
  } else if (type === "psu") {      
    return this.psuInfo.model;
  } else if (type === "cpuCooler") {      
    return this.cpuCoolerInfo.model;
  } else if (type === "motherboard") {
    return this.motherboardInfo.model;
  } else if (type === "ram") {
    return this.ramInfo.model;
  } else if (type === "desktopCase") {
    return this.desktopCaseInfo.model;
  }
  return "bos";
}







}

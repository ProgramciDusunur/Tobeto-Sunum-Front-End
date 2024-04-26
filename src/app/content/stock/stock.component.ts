import { Component, OnInit } from '@angular/core';
import { StockService } from '../../service/stock/stock.service';
import { Stock } from '../../service/models/stock.models';
import { ToastrService } from 'ngx-toastr';
import { TypeService } from '../../service/type/type.service';
import { Cpu, CpuCooler, DesktopCase, Gpu, Motherboard, Psu, Ram } from '../../service/models/type.model';

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
    private typeService: TypeService,

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
    this.stockService.removeSpecificStock(whichId).subscribe(
      (data) => {
        this.toastr.success("Stock succesfully removed.");        
      },
      (error) => {
        this.toastr.error("Stock can't removed.");          
      }
    );
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

  getCpu(cpuId: number) {    
    this.typeService.getCpu(cpuId).subscribe(
      (data) => {
        this.cpuInfo = data;
        console.log(data);
        this.toastr.info("İşlemci bilgisi başarıyla alındı.");        
      },
      (error) => {
        this.toastr.error("İşlemci bilgisi alınamadı.");          
      }
    );
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

  getCpuCooler(cpuCoolerId: number) {    
    this.typeService.getCpuCooler(cpuCoolerId).subscribe(
      (data) => {
        this.cpuCoolerInfo = data;
        console.log(data);
        this.toastr.info("Soğutucu bilgisi başarıyla alındı.");        
      },
      (error) => {
        this.toastr.error("Soğutucu bilgisi alınamadı.");          
      }
    );
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

  getGpu(gpuId: number) {    
    this.typeService.getGpu(gpuId).subscribe(
      (data) => {
        this.gpuInfo = data;
        console.log(data);
        this.toastr.info("Ekran Kartı bilgisi başarıyla alındı.");        
      },
      (error) => {
        this.toastr.error("Ekran Kartı bilgisi alınamadı.");          
      }
    );
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

  getPsu(psuId: number) {    
    this.typeService.getPsu(psuId).subscribe(
      (data) => {
        this.psuInfo = data;
        console.log(data);
        this.toastr.info("Güç Kaynağı bilgisi başarıyla alındı.");        
      },
      (error) => {
        this.toastr.error("Güç Kaynağı bilgisi alınamadı.");          
      }
    );
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

  getRam(ramId: number) {    
    this.typeService.getRam(ramId).subscribe(
      (data) => {
        this.ramInfo = data;
        console.log(data);
        this.toastr.info("Ram bilgisi başarıyla alındı.");        
      },
      (error) => {
        this.toastr.error("Ram bilgisi alınamadı.");          
      }
    );
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

  getMotherboard(motherboardId: number) {    
    this.typeService.getMotherboard(motherboardId).subscribe(
      (data) => {
        this.motherboardInfo = data;
        console.log(data);
        this.toastr.info("Anakart bilgisi başarıyla alındı.");        
      },
      (error) => {
        this.toastr.error("Anakart bilgisi alınamadı.");          
      }
    );
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

  getDesktopCase(desktopCaseId: number) {    
    this.typeService.getDesktopCase(desktopCaseId).subscribe(
      (data) => {
        this.desktopCaseInfo = data;
        console.log(data);
        this.toastr.info("Kasa bilgisi başarıyla alındı.");        
      },
      (error) => {
        this.toastr.error("Kasa bilgisi alınamadı.");          
      }
    );
  }

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


}

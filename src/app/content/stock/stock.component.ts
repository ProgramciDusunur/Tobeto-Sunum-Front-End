import { Component, OnInit } from '@angular/core';
import { StockService } from '../../service/stock/stock.service';
import { Stock } from '../../service/models/stock.models';
import { ToastrService } from 'ngx-toastr';
import { TypeService } from '../../service/type/type.service';
import { Cpu, CpuCooler, DesktopCase, Gpu, Motherboard, Psu, Ram } from '../../service/models/type.model';
import { FormControl, FormGroup } from '@angular/forms';

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
        this.resetSelectedType();
    }
  }

  resetSelectedType() {
    this.selectedType = '';
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


  typeStock: Stock = {
    id: 0,
    type: '',
    quantity: 0,
    typeId: 0
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

  cpuForm = new FormGroup({
    brand: new FormControl(""),
    model: new FormControl(""),
    clockSpeed: new FormControl(0),
    socketType: new FormControl(""),
    generation: new FormControl(""),
    series: new FormControl(""),
    coreCount: new FormControl(0),
    quantity: new FormControl(0)
  });

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

  addCpu(cpu: Cpu, quantity: number) {
    this.typeService.addCpu(cpu).subscribe({
      next: (data) => {
        this.cpuInfo = data;
        this.typeStock.typeId = data.id;    
        this.typeStock.type = "cpu";
        this.typeStock.quantity = quantity;        
        this.addStock(this.typeStock);
        console.log(data);
        this.toastr.info("İşlemci başarıyla eklendi.");
      },
      error: (error) => {
        this.toastr.error("İşlemci eklemesi başarısız.");
      }
    });  
    
  }
  



  cpuFormCheck() {
    const brandControl = this.cpuForm.get('brand');
    const modelControl = this.cpuForm.get('model');
    const clockSpeedControl = this.cpuForm.get('clockSpeed');    
    const socketTypeControl = this.cpuForm.get('socketType');    
    const generationControl = this.cpuForm.get('generation');    
    const seriesControl = this.cpuForm.get('series');
    const coreCountControl = this.cpuForm.get('coreCount');
    const quantityControl = this.cpuForm.get('quantity');
    
    const brandValue = brandControl !== null ? (brandControl.value !== null ? brandControl.value : "") : "";
    const modelValue = modelControl !== null ? (modelControl.value !== null ? modelControl.value : "") : "";
    const clockSpeedValue = clockSpeedControl !== null ? (clockSpeedControl.value !== null ? clockSpeedControl.value : 0) : 0;
    const socketTypeValue = socketTypeControl !== null ? (socketTypeControl.value !== null ? socketTypeControl.value : "") : "";
    const generationValue = generationControl !== null ? (generationControl.value !== null ? generationControl.value : "") : "";
    const seriesValue = seriesControl !== null ? (seriesControl.value !== null ? seriesControl.value : "") : "";
    const coreCountValue = coreCountControl !== null ? (coreCountControl.value !== null ? coreCountControl.value : 0) : 0;
    const quantityValue = quantityControl !== null ? (quantityControl.value !== null ? quantityControl.value : 0) : 0;

    const isBrandValid = brandValue !== null && brandValue !== "";
    const isModelValid = modelValue !== null && modelValue !== "";
    const isClockSpeedValid = clockSpeedValue !== null && clockSpeedValue !== 0;
    const isSocketTypeValid = socketTypeValue !== null && socketTypeValue !== "";
    const isGenerationValid = generationValue !== null && generationValue !== "";
    const isSeriesValid = seriesValue !== null && seriesValue !== "";
    const isCoreCountValid = coreCountValue !== null && coreCountValue !== 0;
    const isQuantityValid = quantityValue !== null && quantityValue !== 0;

    
    const isAllValid = isBrandValid && isModelValid && isClockSpeedValid && isSocketTypeValid && isGenerationValid && isSeriesValid && isCoreCountValid && isQuantityValid;
    
    
    if (isAllValid) {
      // Tüm form elemanlarının değerleri geçerli
      this.cpuInfo.brand = brandValue;
      this.cpuInfo.clockSpeed = clockSpeedValue;
      this.cpuInfo.coreCount = coreCountValue;
      this.cpuInfo.generation = generationValue;
      this.cpuInfo.model = modelValue;
      this.cpuInfo.series = seriesValue;
      this.cpuInfo.socketType = socketTypeValue;
      const stockQuantity = quantityValue;
      this.addCpu(this.cpuInfo, stockQuantity);
      
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

  cpuCoolerForm = new FormGroup({
    brand: new FormControl(""),
    model: new FormControl(""),
    fanLength: new FormControl(""),
    led: new FormControl(""),
    rpm: new FormControl(0),
    material: new FormControl(""),
    type: new FormControl("")
  });

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

  addCpuCooler() {
    
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

  gpuForm = new FormGroup({
    brand: new FormControl(""),
    model: new FormControl(""),
    producer: new FormControl(""),
    series: new FormControl(""),
    vram: new FormControl(0),
    memoryInterface: new FormControl(0)    
  });

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

  addGpu() {
    
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

  psuForm = new FormGroup({
    watt: new FormControl(0),
    efficiency: new FormControl(""),
    modular: new FormControl(false),
    type: new FormControl(""),
    pcieGen5Support: new FormControl(false),
    brand: new FormControl(""),
    model: new FormControl("")        
  });

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

  addPsu() {
    
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

  ramForm = new FormGroup({
    type: new FormControl(""),
    capacity: new FormControl(0),
    frequencySpeed: new FormControl(0),
    channelType: new FormControl(""),
    compatibility: new FormControl(""),
    brand: new FormControl(""),
    model: new FormControl("")        
  });

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

  addRam() {
    
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

  motherboardForm = new FormGroup({
    brand: new FormControl(""),
    size: new FormControl(""),
    model: new FormControl(""),
    ramType: new FormControl(""),
    ramSlots: new FormControl(0),
    cpuSocketType: new FormControl(""),
    cpuCompatibility: new FormControl(false)        
  });

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

  addMotherboard() {
    
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

  desktopCaseForm = new FormGroup({
    psu: new FormControl(false),
    psuLocation: new FormControl(""),
    transparent: new FormControl(false),
    psuWatt: new FormControl(0),
    brand: new FormControl(""),
    model: new FormControl(""),
    type: new FormControl("")        
  });


  getDesktopCase(desktopCaseId: number) {
    this.typeService.getDesktopCase(desktopCaseId).subscribe({
      next: (data) => {
        this.desktopCaseInfo = data;
        console.log(data);
        this.toastr.info("Kasa bilgisi başarıyla alındı.");
      },
      error: (error) => {
        this.toastr.error("Kasa bilgisi alınamadı.");
      }
    });    
  }
  
  addDesktopCase() {
    
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

  /**********************************\
   ==================================

              Type Operations

   ==================================
  \**********************************/

  addProductAndStock() {
    
    if (this.selectedProcess === "Add Product") {
      switch(this.selectedType) {
        case "CPU":
          alert("CPU eklemek istiyorsunuz.");
          this.cpuFormCheck();
        break;

        case "GPU":
          alert("GPU eklemek istiyorsunuz.");
        break;

        case "RAM":
          alert("RAM eklemek istiyorsunuz.");
        break;

        case "PSU":
          alert("PSU eklemek istiyorsunuz.");
        break;

        case "Motherboard":
          alert("Anakart eklemek istiyorsunuz.");
        break;


        case "Computer Case":
          alert("Kasa eklemek istiyorsunuz.");
        break;

        case "CPU Cooler":
          alert("Soğutucu eklemek istiyorsunuz.");
        break;
        
      }      
    }
  }

}

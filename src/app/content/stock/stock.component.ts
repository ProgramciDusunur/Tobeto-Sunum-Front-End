import { Component, OnInit } from '@angular/core';
import { StockService } from '../../service/stock/stock.service';
import { Stock } from '../../service/models/stock.models';
import { ToastrService } from 'ngx-toastr';
import { TypeService } from '../../service/type/type.service';
import { Cpu, CpuCooler, DesktopCase, Gpu, Motherboard, Psu, Ram } from '../../service/models/type.model';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../../service/login/login.service';

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
    private loginService: LoginService    
  ) {}

  userRole: string = "";

  

  stock: Stock[] = [];
  ngOnInit(): void {
    this.fetchStocks();    
    this.userRole = this.loginService.rol;
  }

  canEditComputerComponent(): boolean {
    return this.userRole === 'admin';
  }
  

  fetchStocks(): void {
    this.stockService.getAllStocks().subscribe({
      next: (data: Stock[]) => {
        this.stock = data;
      },
      error: (error) => {
        this.toastr.error('Stoklar alınırken hata oluştu. Lütfen daha sonra tekrar deneyin.');
      }
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
    this.typeService.getCpu(cpuId).subscribe({
      next: (data) => {
        this.cpuInfo = data;        
        console.log(data);
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
    type: new FormControl(""),
    quantity: new FormControl(0)
  });

  getCpuCooler(cpuCoolerId: number) {    
    this.typeService.getCpuCooler(cpuCoolerId).subscribe({
      next: (data) => {
        this.cpuCoolerInfo = data;
        console.log(data);
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
      console.log(data);
      this.toastr.info("CPU soğutucusu başarıyla eklendi.");
    },
    error: (error) => {
      this.toastr.error("CPU soğutucusu eklemesi başarısız.");
    }
  });    
}

cpuCoolerFormCheck() {
  const brandControl = this.cpuCoolerForm.get('brand');
  const modelControl = this.cpuCoolerForm.get('model');
  const fanLengthControl = this.cpuCoolerForm.get('fanLength');    
  const ledControl = this.cpuCoolerForm.get('led');    
  const rpmControl = this.cpuCoolerForm.get('rpm');    
  const materialControl = this.cpuCoolerForm.get('material');
  const typeControl = this.cpuCoolerForm.get('type');
  const quantityControl = this.cpuCoolerForm.get('quantity');
  
  const brandValue = brandControl !== null ? (brandControl.value !== null ? brandControl.value : "") : "";
  const modelValue = modelControl !== null ? (modelControl.value !== null ? modelControl.value : "") : "";
  const fanLengthValue = fanLengthControl !== null ? (fanLengthControl.value !== null ? fanLengthControl.value : "") : "";
  const ledValue = ledControl !== null ? (ledControl.value !== null ? ledControl.value : "") : "";
  const rpmValue = rpmControl !== null ? (rpmControl.value !== null ? rpmControl.value : 0) : 0;
  const materialValue = materialControl !== null ? (materialControl.value !== null ? materialControl.value : "") : "";
  const typeValue = typeControl !== null ? (typeControl.value !== null ? typeControl.value : "") : "";
  const quantityValue = quantityControl !== null ? (quantityControl.value !== null ? quantityControl.value : 0) : 0;

  const isBrandValid = brandValue !== null && brandValue !== "";
  const isModelValid = modelValue !== null && modelValue !== "";
  const isFanLengthValid = fanLengthValue !== null && fanLengthValue !== "";
  const isLedValid = ledValue !== null && ledValue !== "";
  const isRpmValid = rpmValue !== null && rpmValue !== 0;
  const isMaterialValid = materialValue !== null && materialValue !== "";
  const isTypeValid = typeValue !== null && typeValue !== "";
  const isQuantityValid = quantityValue !== null && quantityValue !== 0;

  const isAllValid = isBrandValid && isModelValid && isFanLengthValid && isLedValid && isRpmValid && isMaterialValid && isTypeValid && isQuantityValid;
  //const isAllValid = isBrandValid && isModelValid && isFanLengthValid && isLedValid && isRpmValid;

  if (isAllValid) {
    // Tüm form elemanlarının değerleri geçerli
    this.cpuCoolerInfo.brand = brandValue;
    this.cpuCoolerInfo.fanLength = fanLengthValue;
    this.cpuCoolerInfo.led = ledValue;
    this.cpuCoolerInfo.material = materialValue;
    this.cpuCoolerInfo.model = modelValue;
    this.cpuCoolerInfo.rpm = rpmValue;
    this.cpuCoolerInfo.type = typeValue;
    const stockQuantity = quantityValue;    
    this.addCpuCooler(this.cpuCoolerInfo, stockQuantity);
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

  gpuForm = new FormGroup({
    brand: new FormControl(""),
    model: new FormControl(""),
    producer: new FormControl(""),
    series: new FormControl(""),
    vram: new FormControl(0),
    memoryInterface: new FormControl(0),
    quantity: new FormControl(0)    
  });

  getGpu(gpuId: number) {    
    this.typeService.getGpu(gpuId).subscribe({
      next: (data) => {
        this.gpuInfo = data;
        console.log(data);
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
        console.log(data);
        this.toastr.info("Ekran kartı başarıyla eklendi.");
      },
      error: (error) => {
        this.toastr.error("Ekran kartı eklemesi başarısız.");
      }
    });    
  }
  
  gpuFormCheck() {
    const brandControl = this.gpuForm.get('brand');
    const modelControl = this.gpuForm.get('model');
    const producerControl = this.gpuForm.get('producer');    
    const seriesControl = this.gpuForm.get('series');    
    const vramControl = this.gpuForm.get('vram');    
    const memoryInterfaceControl = this.gpuForm.get('memoryInterface');    
    const quantityControl = this.gpuForm.get('quantity');
    
    const brandValue = brandControl !== null ? (brandControl.value !== null ? brandControl.value : "") : "";
    const modelValue = modelControl !== null ? (modelControl.value !== null ? modelControl.value : "") : "";
    const producerValue = producerControl !== null ? (producerControl.value !== null ? producerControl.value : "") : "";
    const seriesValue = seriesControl !== null ? (seriesControl.value !== null ? seriesControl.value : "") : "";
    const vramValue = vramControl !== null ? (vramControl.value !== null ? vramControl.value : 0) : 0;
    const memoryInterfaceValue = memoryInterfaceControl !== null ? (memoryInterfaceControl.value !== null ? memoryInterfaceControl.value : 0) : 0;
    const quantityValue = quantityControl !== null ? (quantityControl.value !== null ? quantityControl.value : 0) : 0;
  
    const isBrandValid = brandValue !== null && brandValue !== "";
    const isModelValid = modelValue !== null && modelValue !== "";
    const isProducerValid = producerValue !== null && producerValue !== "";
    const isSeriesValid = seriesValue !== null && seriesValue !== "";
    const isVramValid = vramValue !== null && vramValue !== 0;
    const isMemoryInterfaceValid = memoryInterfaceValue !== null && memoryInterfaceValue !== 0;
    const isQuantityValid = quantityValue !== null && quantityValue !== 0;
  
    const isAllValid = isBrandValid && isModelValid && isProducerValid && isSeriesValid && isVramValid && isMemoryInterfaceValid && isQuantityValid;
  
    if (isAllValid) {
      // Tüm form elemanlarının değerleri geçerli
      this.gpuInfo.brand = brandValue;
      this.gpuInfo.model = modelValue;
      this.gpuInfo.producer = producerValue;
      this.gpuInfo.series = seriesValue;
      this.gpuInfo.vram = vramValue;
      this.gpuInfo.memoryInterface = memoryInterfaceValue;
      const stockQuantity = quantityValue;
      this.addGpu(this.gpuInfo, stockQuantity);
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

  psuForm = new FormGroup({
    watt: new FormControl(0),
    efficiency: new FormControl(""),
    modular: new FormControl(null),
    type: new FormControl(""),
    pcieGen5Support: new FormControl(null),
    brand: new FormControl(""),
    model: new FormControl(""),
    quantity: new FormControl(0)      
  });
 
  getPsu(psuId: number) {    
    this.typeService.getPsu(psuId).subscribe({
      next: (data) => {
        this.psuInfo = data;
        console.log(data);
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
        console.log(data);
        this.toastr.info("Güç kaynağı başarıyla eklendi.");
      },
      error: (error) => {
        this.toastr.error("Güç kaynağı eklemesi başarısız.");
      }
    });    
  }
  
  psuFormCheck() {
    const wattControl = this.psuForm.get('watt');
    const efficiencyControl = this.psuForm.get('efficiency');
    const modularControl = this.psuForm.get('modular');    
    const typeControl = this.psuForm.get('type');    
    const pcieGen5SupportControl = this.psuForm.get('pcieGen5Support');    
    const brandControl = this.psuForm.get('brand');
    const modelControl = this.psuForm.get('model');
    const quantityControl = this.psuForm.get('quantity');
    
    const wattValue = wattControl !== null ? (wattControl.value !== null ? wattControl.value : 0) : 0;
    const efficiencyValue = efficiencyControl !== null ? (efficiencyControl.value !== null ? efficiencyControl.value : "") : "";
    const modularValue = modularControl !== null ? (modularControl.value !== null ? modularControl.value : false) : false;
    const typeValue = typeControl !== null ? (typeControl.value !== null ? typeControl.value : "") : "";
    const pcieGen5SupportValue = pcieGen5SupportControl !== null ? (pcieGen5SupportControl.value !== null ? pcieGen5SupportControl.value : false) : false;
    const brandValue = brandControl !== null ? (brandControl.value !== null ? brandControl.value : "") : "";
    const modelValue = modelControl !== null ? (modelControl.value !== null ? modelControl.value : "") : "";
    const quantityValue = quantityControl !== null ? (quantityControl.value !== null ? quantityControl.value : 0) : 0;
  
    const isWattValid = wattValue !== null && wattValue !== 0;
    const isEfficiencyValid = efficiencyValue !== null && efficiencyValue !== "";
    const isModularValid = modularValue !== null;
    const isTypeValid = typeValue !== null && typeValue !== "";
    const isPcieGen5SupportValid = pcieGen5SupportValue !== null;
    const isBrandValid = brandValue !== null && brandValue !== "";
    const isModelValid = modelValue !== null && modelValue !== "";
    const isQuantityValid = quantityValue !== null && quantityValue !== 0;
  
    const isAllValid = isWattValid && isEfficiencyValid && isModularValid && isTypeValid && isPcieGen5SupportValid && isBrandValid && isModelValid && isQuantityValid;
  
    if (isAllValid) {
      // Tüm form elemanlarının değerleri geçerli
      this.psuInfo.watt = wattValue;
      this.psuInfo.efficiency = efficiencyValue;
      this.psuInfo.modular = modularValue;
      this.psuInfo.type = typeValue;
      this.psuInfo.pcieGen5Support = pcieGen5SupportValue;
      this.psuInfo.brand = brandValue;
      this.psuInfo.model = modelValue;
      const stockQuantity = quantityValue;
      this.addPsu(this.psuInfo, stockQuantity);
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

  ramForm = new FormGroup({
    type: new FormControl(""),
    capacity: new FormControl(0),
    frequencySpeed: new FormControl(0),
    channelType: new FormControl(""),
    compatibility: new FormControl(""),
    brand: new FormControl(""),
    model: new FormControl(""),
    quantity: new FormControl(0)           
  });

  getRam(ramId: number) {    
    this.typeService.getRam(ramId).subscribe({
      next: (data) => {
        this.ramInfo = data;
        console.log(data);
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
        console.log(data);
        this.toastr.info("RAM başarıyla eklendi.");
      },
      error: (error) => {
        this.toastr.error("RAM eklemesi başarısız.");
      }
    });    
  }
  
  ramFormCheck() {
    const typeControl = this.ramForm.get('type');
    const capacityControl = this.ramForm.get('capacity');
    const frequencySpeedControl = this.ramForm.get('frequencySpeed');    
    const channelTypeControl = this.ramForm.get('channelType');    
    const compatibilityControl = this.ramForm.get('compatibility');    
    const brandControl = this.ramForm.get('brand');
    const modelControl = this.ramForm.get('model');
    const quantityControl = this.ramForm.get('quantity');
    
    const typeValue = typeControl !== null ? (typeControl.value !== null ? typeControl.value : "") : "";
    const capacityValue = capacityControl !== null ? (capacityControl.value !== null ? capacityControl.value : 0) : 0;
    const frequencySpeedValue = frequencySpeedControl !== null ? (frequencySpeedControl.value !== null ? frequencySpeedControl.value : 0) : 0;
    const channelTypeValue = channelTypeControl !== null ? (channelTypeControl.value !== null ? channelTypeControl.value : "") : "";
    const compatibilityValue = compatibilityControl !== null ? (compatibilityControl.value !== null ? compatibilityControl.value : "") : "";
    const brandValue = brandControl !== null ? (brandControl.value !== null ? brandControl.value : "") : "";
    const modelValue = modelControl !== null ? (modelControl.value !== null ? modelControl.value : "") : "";
    const quantityValue = quantityControl !== null ? (quantityControl.value !== null ? quantityControl.value : 0) : 0;
  
    const isTypeValid = typeValue !== null && typeValue !== "";
    const isCapacityValid = capacityValue !== null && capacityValue !== 0;
    const isFrequencySpeedValid = frequencySpeedValue !== null && frequencySpeedValue !== 0;
    const isChannelTypeValid = channelTypeValue !== null && channelTypeValue !== "";
    const isCompatibilityValid = compatibilityValue !== null && compatibilityValue !== "";
    const isBrandValid = brandValue !== null && brandValue !== "";
    const isModelValid = modelValue !== null && modelValue !== "";
    const isQuantityValid = quantityValue !== null && quantityValue !== 0;
  
    const isAllValid = isTypeValid && isCapacityValid && isFrequencySpeedValid && isChannelTypeValid && isCompatibilityValid && isBrandValid && isModelValid && isQuantityValid;
  
    if (isAllValid) {
      // Tüm form elemanlarının değerleri geçerli
      this.ramInfo.type = typeValue;
      this.ramInfo.capacity = capacityValue;
      this.ramInfo.frequencySpeed = frequencySpeedValue;
      this.ramInfo.channelType = channelTypeValue;
      this.ramInfo.compatibility = compatibilityValue;
      this.ramInfo.brand = brandValue;
      this.ramInfo.model = modelValue;
      const stockQuantity = quantityValue;
      this.addRam(this.ramInfo, stockQuantity);
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

  motherboardForm = new FormGroup({
    brand: new FormControl(""),
    size: new FormControl(""),
    model: new FormControl(""),
    ramType: new FormControl(""),
    ramSlots: new FormControl(0),
    cpuSocketType: new FormControl(""),
    cpuCompatibility: new FormControl(null),
    quantity: new FormControl(0)           
  });

  getMotherboard(motherboardId: number) {    
    this.typeService.getMotherboard(motherboardId).subscribe({
      next: (data) => {
        this.motherboardInfo = data;
        console.log(data);
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
        console.log(data);
        this.toastr.info("Anakart başarıyla eklendi.");
      },
      error: (error) => {
        this.toastr.error("Anakart eklemesi başarısız.");
      }
    });    
  }
  
  motherboardFormCheck() {
    const brandControl = this.motherboardForm.get('brand');
    const sizeControl = this.motherboardForm.get('size');
    const modelControl = this.motherboardForm.get('model');    
    const ramTypeControl = this.motherboardForm.get('ramType');    
    const ramSlotsControl = this.motherboardForm.get('ramSlots');    
    const cpuSocketTypeControl = this.motherboardForm.get('cpuSocketType');
    const cpuCompatibilityControl = this.motherboardForm.get('cpuCompatibility');
    const quantityControl = this.motherboardForm.get('quantity');
    
    const brandValue = brandControl !== null ? (brandControl.value !== null ? brandControl.value : "") : "";
    const sizeValue = sizeControl !== null ? (sizeControl.value !== null ? sizeControl.value : "") : "";
    const modelValue = modelControl !== null ? (modelControl.value !== null ? modelControl.value : "") : "";
    const ramTypeValue = ramTypeControl !== null ? (ramTypeControl.value !== null ? ramTypeControl.value : "") : "";
    const ramSlotsValue = ramSlotsControl !== null ? (ramSlotsControl.value !== null ? ramSlotsControl.value : 0) : 0;
    const cpuSocketTypeValue = cpuSocketTypeControl !== null ? (cpuSocketTypeControl.value !== null ? cpuSocketTypeControl.value : "") : "";
    const cpuCompatibilityValue = cpuCompatibilityControl !== null ? (cpuCompatibilityControl.value !== null ? cpuCompatibilityControl.value : null) : null;
    const quantityValue = quantityControl !== null ? (quantityControl.value !== null ? quantityControl.value : 0) : 0;
  
    const isBrandValid = brandValue !== null && brandValue !== "";
    const isSizeValid = sizeValue !== null && sizeValue !== "";
    const isModelValid = modelValue !== null && modelValue !== "";
    const isRamTypeValid = ramTypeValue !== null && ramTypeValue !== "";
    const isRamSlotsValid = ramSlotsValue !== null && ramSlotsValue !== 0;
    const isCpuSocketTypeValid = cpuSocketTypeValue !== null && cpuSocketTypeValue !== "";
    const isCpuCompatibilityValid = cpuCompatibilityValue !== null;
    const isQuantityValid = quantityValue !== null && quantityValue !== 0;
  
    const isAllValid = isBrandValid && isSizeValid && isModelValid && isRamTypeValid && isRamSlotsValid && isCpuSocketTypeValid && isCpuCompatibilityValid && isQuantityValid;
  
    if (isAllValid) {
      // Tüm form elemanlarının değerleri geçerli
      this.motherboardInfo.brand = brandValue;
      this.motherboardInfo.size = sizeValue;
      this.motherboardInfo.model = modelValue;
      this.motherboardInfo.ramType = ramTypeValue;
      this.motherboardInfo.ramSlots = ramSlotsValue;
      this.motherboardInfo.cpuSocketType = cpuSocketTypeValue;
      // cpuCompatibilityValue'nun değerine göre doğru değeri atayın
      this.motherboardInfo.cpuCompatibility = cpuCompatibilityValue === "INTEL Uyumlu" ? true : false;
      const stockQuantity = quantityValue;
      this.addMotherboard(this.motherboardInfo, stockQuantity);
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

  desktopCaseForm = new FormGroup({
    psu: new FormControl(""),
    psuLocation: new FormControl(""),
    transparent: new FormControl(""),
    psuWatt: new FormControl(0),
    brand: new FormControl(""),
    model: new FormControl(""),
    type: new FormControl(""),
    quantity: new FormControl(0)     
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
  
  addDesktopCase(desktopCase: DesktopCase, quantity: number) {
    this.typeService.addDesktopCase(desktopCase).subscribe({
      next: (data) => {
        this.desktopCaseInfo = data;
        this.typeStock.typeId = data.id;    
        this.typeStock.type = "desktopCase";
        this.typeStock.quantity = quantity;        
        this.addStock(this.typeStock);
        console.log(data);
        this.toastr.info("Kasa başarıyla eklendi.");
      },
      error: (error) => {
        this.toastr.error("Kasa eklemesi başarısız.");
      }
    });    
  }

  desktopCaseFormCheck() {
    const psuControl = this.desktopCaseForm.get('psu');
    const psuLocationControl = this.desktopCaseForm.get('psuLocation');
    const transparentControl = this.desktopCaseForm.get('transparent');    
    const psuWattControl = this.desktopCaseForm.get('psuWatt');    
    const brandControl = this.desktopCaseForm.get('brand');    
    const modelControl = this.desktopCaseForm.get('model');
    const typeControl = this.desktopCaseForm.get('type');
    const quantityControl = this.desktopCaseForm.get('quantity');
    
    const psuValue = psuControl !== null ? (psuControl.value !== null ? psuControl.value : null) : null;
    const psuLocationValue = psuLocationControl !== null ? (psuLocationControl.value !== null ? psuLocationControl.value : "") : "";
    const transparentValue = transparentControl !== null ? (transparentControl.value !== null ? transparentControl.value : null) : null;
    const psuWattValue = psuWattControl !== null ? (psuWattControl.value !== null ? psuWattControl.value : 0) : 0;
    const brandValue = brandControl !== null ? (brandControl.value !== null ? brandControl.value : "") : "";
    const modelValue = modelControl !== null ? (modelControl.value !== null ? modelControl.value : "") : "";
    const typeValue = typeControl !== null ? (typeControl.value !== null ? typeControl.value : "") : "";
    const quantityValue = quantityControl !== null ? (quantityControl.value !== null ? quantityControl.value : 0) : 0;
  
    // PSU değerini true veya false olarak ayarla
    const isPsuValid = psuValue === "VAR" ? true : false;
    const isPsuLocationValid = psuLocationValue !== null && psuLocationValue !== "";
    // Transparent değerini true veya false olarak ayarla
    const isTransparentValid = transparentValue === "EVET" ? true : false;
    const isPsuWattValid = psuWattValue !== null && psuWattValue !== 0;
    const isBrandValid = brandValue !== null && brandValue !== "";
    const isModelValid = modelValue !== null && modelValue !== "";
    const isTypeValid = typeValue !== null && typeValue !== "";
    const isQuantityValid = quantityValue !== null && quantityValue !== 0;
  
    const isAllValid = isPsuValid && isPsuLocationValid && isTransparentValid && isPsuWattValid && isBrandValid && isModelValid && isTypeValid && isQuantityValid;
  
    if (isAllValid) {
      // Tüm form elemanlarının değerleri geçerli
      this.desktopCaseInfo.psu = isPsuValid;
      this.desktopCaseInfo.psuLocation = psuLocationValue;
      this.desktopCaseInfo.transparent = isTransparentValid;
      this.desktopCaseInfo.psuWatt = psuWattValue;
      this.desktopCaseInfo.brand = brandValue;
      this.desktopCaseInfo.model = modelValue;
      this.desktopCaseInfo.type = typeValue;
      const stockQuantity = quantityValue;
      this.addDesktopCase(this.desktopCaseInfo, stockQuantity);
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
          alert("CPU eklemek istiyorsunuz.");
          this.cpuFormCheck();
        break;

        case "GPU":
          alert("GPU eklemek istiyorsunuz.");
          this.gpuFormCheck();
        break;

        case "RAM":
          alert("RAM eklemek istiyorsunuz.");
          this.ramFormCheck();
        break;

        case "PSU":
          alert("PSU eklemek istiyorsunuz.");
          this.psuFormCheck();
        break;

        case "Motherboard":
          alert("Anakart eklemek istiyorsunuz.");
          this.motherboardFormCheck();
        break;


        case "Computer Case":
          alert("Kasa eklemek istiyorsunuz.");
          this.desktopCaseFormCheck();
        break;

        case "CPU Cooler":
          alert("Soğutucu eklemek istiyorsunuz.");
          this.cpuCoolerFormCheck();
        break;
        
      }      
    }
  }

  editProductAndStock() {
    alert(this.selectedGlobalType);
    switch(this.selectedGlobalType) {
      case "cpu":
        alert("CPU eklemek istiyorsunuz.");
        this.cpuFormCheck();
      break;

      case "gpu":
        alert("GPU eklemek istiyorsunuz.");
        this.gpuFormCheck();
      break;

      case "ram":
        alert("RAM eklemek istiyorsunuz.");
        this.ramFormCheck();
      break;

      case "psu":
        alert("PSU eklemek istiyorsunuz.");
        this.psuFormCheck();
      break;

      case "motherboard":
        alert("Anakart eklemek istiyorsunuz.");
        this.motherboardFormCheck();
      break;


      case "desktopCase":
        alert("Kasa eklemek istiyorsunuz.");
        this.desktopCaseFormCheck();
      break;

      case "CPU Cooler":
        alert("Soğutucu eklemek istiyorsunuz.");
        this.cpuCoolerFormCheck();
      break;
      
    }
  }

}

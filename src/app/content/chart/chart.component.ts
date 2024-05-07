import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { TypeComponent } from '../type/type.component';
import { TypeService } from '../../service/type/type.service';
import { Cpu, CpuCooler, DesktopCase, Gpu, Motherboard, Psu, Ram } from '../../service/models/type.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  constructor(private typeService: TypeService) { }

  type: TypeComponent = new TypeComponent(this.typeService);
  allProcessors: Cpu[] = [];
  allCpuCoolers: CpuCooler[] = [];
  allDesktopCases: DesktopCase[] = [];
  allMotherboards: Motherboard[] = [];
  allPowerSupplies: Psu[] = [];
  allRam: Ram[] = [];
  allGpu: Gpu[] = [];

  totalParts: number = 0;
  processorPercentage: number = 0;
  cpuCoolerPercentage: number = 0;
  desktopCasePercentage: number = 0;
  motherboardPercentage: number = 0;
  powerSupplyPercentage: number = 0;
  ramPercentage: number = 0;
  gpuPercentage: number = 0;

  ngOnInit(): void {
    this.getAllProcessors();
    this.getAllCpuCoolers();
    this.getAllDesktopCases();
    this.getAllMotherboards();
    this.getAllPowerSupplies();
    this.getAllRam();
    this.getAllGpu();        
  }

  getAllProcessors(): void {
    this.typeService.getAllProcessors().subscribe({
      next: (processors: Cpu[]) => {
        this.allProcessors = processors;
        console.log(this.allProcessors);
        console.log(this.allProcessors.length);
        this.totalParts += this.allProcessors.length;
      },
      error: (error) => {
        console.error('Error fetching processors:', error);
      }
    });
  }

  getAllCpuCoolers(): void {
    this.typeService.getAllCpuCoolers().subscribe({
      next: (cpuCoolers: CpuCooler[]) => {
        this.allCpuCoolers = cpuCoolers;
        this.totalParts += this.allCpuCoolers.length;
      },
      error: (error) => {
        console.error('Error fetching CPU coolers:', error);
      }
    });
  }

  getAllDesktopCases(): void {
    this.typeService.getAllDesktopCases().subscribe({
      next: (desktopCases: DesktopCase[]) => {
        this.allDesktopCases = desktopCases;
        this.totalParts += this.allDesktopCases.length;
      },
      error: (error) => {
        console.error('Error fetching desktop cases:', error);
      }
    });
  }

  getAllMotherboards(): void {
    this.typeService.getAllMotherboards().subscribe({
      next: (motherboards: Motherboard[]) => {
        this.allMotherboards = motherboards;
        this.totalParts += this.allMotherboards.length;
      },
      error: (error) => {
        console.error('Error fetching motherboards:', error);
      }
    });
  }

  getAllPowerSupplies(): void {
    this.typeService.getAllPowerSupplies().subscribe({
      next: (powerSupplies: Psu[]) => {
        this.allPowerSupplies = powerSupplies;
        this.totalParts += this.allPowerSupplies.length;
      },
      error: (error) => {
        console.error('Error fetching power supplies:', error);
      }
    });
  }

  getAllRam(): void {
    this.typeService.getAllRam().subscribe({
      next: (ram: Ram[]) => {
        this.allRam = ram;
        this.totalParts += this.allRam.length;
      },
      error: (error) => {
        console.error('Error fetching RAM:', error);
      }
    });
  }

  getAllGpu(): void {
    this.typeService.getAllGpu().subscribe({
      next: (gpu: Gpu[]) => {
        this.allGpu = gpu;
        this.totalParts += this.allGpu.length;        
        this.updatePercentages();
      },
      error: (error) => {
        console.error('Error fetching RAM:', error);
      }
    });
  }

  // Diğer metotlar da benzer şekilde güncellenmeli...

  updatePercentages(): void {
    this.processorPercentage = (this.allProcessors.length / this.totalParts) * 100;
    this.cpuCoolerPercentage = (this.allCpuCoolers.length / this.totalParts) * 100;
    this.desktopCasePercentage = (this.allDesktopCases.length / this.totalParts) * 100;
    this.motherboardPercentage = (this.allMotherboards.length / this.totalParts) * 100;
    this.powerSupplyPercentage = (this.allPowerSupplies.length / this.totalParts) * 100;
    this.ramPercentage = (this.allRam.length / this.totalParts) * 100;
    this.gpuPercentage = (this.allGpu.length / this.totalParts) * 100;
    // Diğer yüzdeleri de güncelleyin...
    this.updateChart();
  }

  updateChart(): void {
    this.chart = new Chart({
      chart: {
        type: 'pie',
        backgroundColor: 'rgba(255, 255, 255, 0)'
      },
      title: {
        text: 'Ürün Gamı', // Başlık
        style: {
          color: 'whitesmoke' // Başlık rengi
        }
      },
      plotOptions: {
        pie: {
          innerSize: '50%',
          depth: 45
        }
      },
      credits: {
        enabled: false // Krediyi devre dışı bırak
      },
      series: [
        {
          name: 'Data',
          type: 'pie',
          data: [
            ['İşlemci', this.processorPercentage],
            ['Grafik Kart', this.gpuPercentage],
            ['Güç Kaynağı', this.powerSupplyPercentage],
            ['Bellek', this.ramPercentage],
            ['Anakart', this.motherboardPercentage],
            ['Soğutucu', this.cpuCoolerPercentage],
            ['Bilgisayar Kasası', this.desktopCasePercentage]
          ]
        }
      ]
    }); 
  }

  chart = new Chart(); // Başlangıçta boş bir chart oluşturuyoruz
}

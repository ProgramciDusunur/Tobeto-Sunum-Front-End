import { Component, OnInit } from '@angular/core';
import { Cpu, CpuCooler, DesktopCase, Gpu, Motherboard, Psu, Ram } from '../../service/models/type.model';
import { TypeService } from '../../service/type/type.service';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent implements OnInit {
  allProcessors: Cpu[] = [];
  allCpuCoolers: CpuCooler[] = [];
  allDesktopCases: DesktopCase[] = [];
  allMotherboards: Motherboard[] = [];
  allPowerSupplies: Psu[] = [];
  allRam: Ram[] = [];
  allGpu: Gpu[] = [];


  constructor(private typeService: TypeService) { }

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
      },
      error: (error) => {
        console.error('Error fetching RAM:', error);
      }
    });
  }
}

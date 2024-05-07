import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cpu, CpuCooler, DesktopCase, Gpu, Motherboard, Psu, Ram } from '../models/type.model';
import { Observable } from 'rxjs';

 /**********************************\
  ==================================

                Get

  ==================================
 \**********************************/
 const GET_CPU_URL = '/type/cpu/get';
 const GET_CPUCOOLER_URL = '/type/cpucooler/get';
 const GET_GPU_URL = '/type/gpu/get';
 const GET_PSU_URL = '/type/psu/get';
 const GET_RAM_URL = '/type/ram/get';
 const GET_MOTHERBOARD_URL = '/type/motherboard/get';
 const GET_DESKTOPCASE_URL = '/type/case/get';

 const GET_ALL_CPU_URL = '/type/cpu/get/all';
 const GET_ALL_CPUCOOLER_URL = '/type/cpucooler/get/all';
 const GET_ALL_GPU_URL = '/type/gpu/get/all';
 const GET_ALL_PSU_URL = '/type/psu/get/all';
 const GET_ALL_RAM_URL = '/type/ram/get/all';
 const GET_ALL_MOTHERBOARD_URL = '/type/motherboard/get/all';
 const GET_ALL_DESKTOPCASE_URL = '/type/case/get/all';



/**********************************\
 ==================================

              Post

 ==================================
\**********************************/


const POST_CPU_URL = '/type/cpu/add';
const POST_CPUCOOLER_URL = '/type/cpucooler/add';
const POST_GPU_URL = '/type/gpu/add';
const POST_PSU_URL = '/type/psu/add';
const POST_RAM_URL = '/type/ram/add';
const POST_MOTHERBOARD_URL = '/type/motherboard/add';
const POST_DESKTOPCASE_URL = '/type/case/add';


/**********************************\
 ==================================

              Edit

 ==================================
\**********************************/

const  EDIT_CPU_URL = '/type/cpu/put';
const  EDIT_CPUCOOLER_URL = '/type/cpucooler/put';
const  EDIT_GPU_URL = '/type/gpu/put';
const  EDIT_PSU_URL = '/type/psu/put';
const  EDIT_RAM_URL = '/type/ram/put';
const  EDIT_MOTHERBOARD_URL = '/type/motherboard/put';
const  EDIT_DESKTOPCASE_URL = '/type/case/put';
@Injectable({
  providedIn: 'root'
})
export class TypeService {
        
  

  constructor(private http: HttpClient) { }


  /**********************************\
   ==================================

                 CPU

   ==================================
  \**********************************/

  getCpu(cpuId: number): Observable<Cpu> {
    const body = { typeId: cpuId};
    return this.http.post<Cpu>(GET_CPU_URL, body );
  }

  addCpu(cpu: Cpu): Observable<Cpu> {
    
    const body = { brand: cpu.brand,
                   clockSpeed: cpu.clockSpeed,
                   socketType: cpu.socketType,
                   generation: cpu.generation,
                   series: cpu.series,
                   coreCount: cpu.coreCount,
                   model: cpu.model};
    return this.http.post<Cpu>(POST_CPU_URL, body);
  }

  editCpu(cpu: Cpu): Observable<Cpu> {
    
    const body = { 
      id: cpu.id,
      brand: cpu.brand,
      clockSpeed: cpu.clockSpeed,
      socketType: cpu.socketType,
      generation: cpu.generation,
      series: cpu.series,
      coreCount: cpu.coreCount,
      model: cpu.model};
      return this.http.post<Cpu>(EDIT_CPU_URL, body);
  }
  
  getAllProcessors(): Observable<Cpu[]> {
    return this.http.get<Cpu[]>(GET_ALL_CPU_URL);
  }

  /**********************************\
   ==================================

              CPU Cooler

  ==================================
  \**********************************/

  getCpuCooler(cpuCoolerId: number): Observable<CpuCooler> {
    
    const body = { typeId: cpuCoolerId};
    return this.http.post<CpuCooler>(GET_CPUCOOLER_URL, body );
  }

  addCpuCooler(cpuCooler: CpuCooler): Observable<CpuCooler> {
    
    const body = { type: cpuCooler.type,
                   fanLength: cpuCooler.fanLength,
                   rpm: cpuCooler.rpm,
                   material: cpuCooler.material,
                   led: cpuCooler.led,
                   brand: cpuCooler.brand,
                   model: cpuCooler.model};
    return this.http.post<CpuCooler>(POST_CPUCOOLER_URL, body);
  }

  editCpuCooler(cpuCooler: CpuCooler): Observable<CpuCooler> {
    
    const body = { 
      id: cpuCooler.id,
      brand: cpuCooler.brand,
      fanLength: cpuCooler.fanLength,
      led:  cpuCooler.led,
      material:  cpuCooler.material,
      model: cpuCooler.model,
      rpm:  cpuCooler.rpm,
      type:  cpuCooler.type};
      return this.http.post<CpuCooler>(EDIT_CPUCOOLER_URL, body);
  }  

  getAllCpuCoolers(): Observable<CpuCooler[]> {
    return this.http.get<CpuCooler[]>(GET_ALL_CPUCOOLER_URL);
  }

   /**********************************\
    ==================================

                  GPU

    ==================================
   \**********************************/

  getGpu(cpuId: number): Observable<Gpu> {
    
    const body = { typeId: cpuId};
    return this.http.post<Gpu>(GET_GPU_URL, body );
  }

  addGpu(gpu: Gpu): Observable<Gpu> {
    
    const body = { brand: gpu.brand,
                   producer: gpu.producer,
                   series: gpu.series,
                   model: gpu.model,
                   vram: gpu.vram,
                   memoryInterface: gpu.memoryInterface};
    return this.http.post<Gpu>(POST_GPU_URL, body);
  }

  editGpu(gpu: Gpu): Observable<Gpu> {
    
    const body = { 
      id: gpu.id,
      brand: gpu.brand,
      memoryInterface: gpu.memoryInterface,
      model:  gpu.model,
      producer:  gpu.producer,
      series: gpu.series,
      vram:  gpu.vram,
      };
      return this.http.post<Gpu>(EDIT_GPU_URL, body);
  }  

  getAllGpu(): Observable<Gpu[]> {
    return this.http.get<Gpu[]>(GET_ALL_GPU_URL);
  }

  /**********************************\
   ==================================

                  PSU

   ==================================
  \**********************************/

  getPsu(cpuId: number): Observable<Psu> {
    
    const body = { typeId: cpuId};
    return this.http.post<Psu>(GET_PSU_URL, body );
  }

  addPsu(psu: Psu): Observable<Psu> {
    
    const body = { watt: psu.watt,
                   efficiency: psu.efficiency,
                   modular: psu.modular,
                   type: psu.type,
                   pcieGen5Support: psu.pcieGen5Support,
                   brand: psu.brand,
                   model: psu.model};
    return this.http.post<Psu>(POST_PSU_URL, body);
  }

  editPsu(psu: Psu): Observable<Psu> {    
    const body = { 
      id: psu.id,
      brand: psu.brand,
      efficiency: psu.efficiency,
      model:  psu.model,
      modular:  psu.modular,
      pcieGen5Support: psu.pcieGen5Support,
      type:  psu.type,
      watt:  psu.watt,
      };
      return this.http.post<Psu>(EDIT_PSU_URL, body);
  }

  getAllPowerSupplies(): Observable<Psu[]> {
    return this.http.get<Psu[]>(GET_ALL_PSU_URL);
  }

  /**********************************\
   ==================================

                  RAM

   ==================================
  \**********************************/

  getRam(cpuId: number): Observable<Ram> {
    
    const body = { typeId: cpuId};
    return this.http.post<Ram>(GET_RAM_URL, body );
  }

  addRam(ram: Ram): Observable<Ram> {    
    const body = { type: ram.type,
                   capacity: ram.capacity,
                   frequencySpeed: ram.frequencySpeed,
                   channelType: ram.channelType,
                   compatibility: ram.compatibility,
                   brand: ram.brand,
                   model: ram.model};
    return this.http.post<Ram>(POST_RAM_URL, body);
  }

  editRam(ram: Ram): Observable<Ram> {    
    const body = { 
      id: ram.id,
      brand: ram.brand,
      capacity: ram.capacity,
      model:  ram.model,
      channelType:  ram.channelType,
      compatibility: ram.compatibility,
      frequencySpeed:  ram.frequencySpeed,
      type:  ram.type,
      };
      return this.http.post<Ram>(EDIT_RAM_URL, body);
  }

  getAllRam(): Observable<Ram[]> {
    return this.http.get<Ram[]>(GET_ALL_RAM_URL);
  }



  

   /**********************************\
    ==================================

                Motherboard

    ==================================
   \**********************************/


  getMotherboard(cpuId: number): Observable<Motherboard> {    
    const body = { typeId: cpuId};
    return this.http.post<Motherboard>(GET_MOTHERBOARD_URL, body );
  }

  addMotherboard(motherboard: Motherboard): Observable<Motherboard> {
    
    const body = { cpuSocketType: motherboard.cpuSocketType,
                   cpuCompatibility: motherboard.cpuCompatibility,
                   ramType: motherboard.ramType,
                   size: motherboard.size,
                   ramSlots: motherboard.ramSlots,
                   brand: motherboard.brand,
                   model: motherboard.model};
    return this.http.post<Motherboard>(POST_MOTHERBOARD_URL, body);
  }

  editMotherboard(motherboard: Motherboard): Observable<Motherboard> {    
    const body = { 
      id: motherboard.id,
      brand: motherboard.brand,
      cpuCompatibility: motherboard.cpuCompatibility,
      cpuSocketType:  motherboard.cpuSocketType,
      model:  motherboard.model,
      ramSlots: motherboard.ramSlots,
      ramType:  motherboard.ramType,
      size:  motherboard.size,
      };
      return this.http.post<Motherboard>(EDIT_MOTHERBOARD_URL, body);
  }

  getAllMotherboards(): Observable<Motherboard[]> {
    return this.http.get<Motherboard[]>(GET_ALL_MOTHERBOARD_URL);
  }



   /**********************************\
    ==================================

              Desktop Case

    ==================================
   \**********************************/

  getDesktopCase(cpuId: number): Observable<DesktopCase> {
    
    const body = { typeId: cpuId};
    return this.http.post<DesktopCase>(GET_DESKTOPCASE_URL, body );
  }

  addDesktopCase(desktopCase: DesktopCase): Observable<DesktopCase> {
    
    const body = { brand: desktopCase.brand,
                   psu: desktopCase.psu,
                   psuLocation: desktopCase.psuLocation,
                   transparent: desktopCase.transparent,                   
                   psuWatt: desktopCase.psuWatt,
                   model: desktopCase.model,
                   type: desktopCase.type};
    return this.http.post<DesktopCase>(POST_DESKTOPCASE_URL, body);
  }

  editDesktopCase(desktopCase: DesktopCase): Observable<DesktopCase> {
    
    const body = { 
      id: desktopCase.id,
      brand: desktopCase.brand,
      model: desktopCase.model,
      psu:  desktopCase.psu,
      psuLocation:  desktopCase.psuLocation,
      psuWatt: desktopCase.psuWatt,
      transparent:  desktopCase.transparent,
      type:  desktopCase.type,
      };
      return this.http.post<DesktopCase>(EDIT_DESKTOPCASE_URL, body);
  }

  getAllDesktopCases(): Observable<DesktopCase[]> {
    return this.http.get<DesktopCase[]>(GET_ALL_DESKTOPCASE_URL);
  }
}

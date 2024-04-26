import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Cpu, CpuCooler, DesktopCase, Gpu, Motherboard, Psu, Ram } from '../models/type.model';
import { Observable } from 'rxjs';

 /**********************************\
 ==================================

               Get

 ==================================
\**********************************/
 const GET_CPU_URL = environment.serverURL+'/type/cpu/get';
 const GET_CPUCOOLER_URL = environment.serverURL+'/type/cpucooler/get';
 const GET_GPU_URL = environment.serverURL+'/type/gpu/get';
 const GET_PSU_URL = environment.serverURL+'/type/psu/get';
 const GET_RAM_URL = environment.serverURL+'/type/ram/get';
 const GET_MOTHERBOARD_URL = environment.serverURL+'/type/motherboard/get';
 const GET_DESKTOPCASE_URL = environment.serverURL+'/type/case/get';

/**********************************\
 ==================================

              Post

 ==================================
\**********************************/


const POST_CPU_URL = environment.serverURL+'/type/cpu/add';
const POST_CPUCOOLER_URL = environment.serverURL+'/type/cpucooler/add';
const POST_GPU_URL = environment.serverURL+'/type/gpu/add';
const POST_PSU_URL = environment.serverURL+'/type/psu/add';
const POST_RAM_URL = environment.serverURL+'/type/ram/add';
const POST_MOTHERBOARD_URL = environment.serverURL+'/type/motherboard/add';
const POST_DESKTOPCASE_URL = environment.serverURL+'/type/case/add';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
        
  createAuthHeader() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+ localStorage.getItem("token"),      
    });
    return headers;
  }

  constructor(private http: HttpClient) { }


  /**********************************\
   ==================================

                CPU

   ==================================
  \**********************************/

  getCpu(cpuId: number): Observable<Cpu> {
    const headers = this.createAuthHeader();
    const body = { typeId: cpuId};
    return this.http.post<Cpu>(GET_CPU_URL, body ,{headers});
  }

  addCpu(cpu: Cpu): Observable<Cpu> {
    const headers = this.createAuthHeader();
    const body = { brand: cpu.brand,
                   clockSpeed: cpu.clockSpeed,
                   socketType: cpu.socketType,
                   generation: cpu.generation,
                   series: cpu.series,
                   coreCount: cpu.coreCount,
                   model: cpu.model};
    return this.http.post<Cpu>(POST_CPU_URL, body, {headers});
  }


  /**********************************\
   ==================================

              CPU Cooler

  ==================================
  \**********************************/

  getCpuCooler(cpuCoolerId: number): Observable<CpuCooler> {
    const headers = this.createAuthHeader();
    const body = { typeId: cpuCoolerId};
    return this.http.post<CpuCooler>(GET_CPUCOOLER_URL, body ,{headers});
  }

  addCpuCooler(cpuCooler: CpuCooler): Observable<CpuCooler> {
    const headers = this.createAuthHeader();
    const body = { type: cpuCooler.type,
                   fanLength: cpuCooler.fanLength,
                   rpm: cpuCooler.rpm,
                   material: cpuCooler.material,
                   led: cpuCooler.led,
                   brand: cpuCooler.brand,
                   model: cpuCooler.model};
    return this.http.post<CpuCooler>(POST_CPUCOOLER_URL, body, {headers});
  }

  

   /**********************************\
    ==================================

                  GPU

    ==================================
   \**********************************/

  getGpu(cpuId: number): Observable<Gpu> {
    const headers = this.createAuthHeader();
    const body = { typeId: cpuId};
    return this.http.post<Gpu>(GET_GPU_URL, body ,{headers});
  }

  addGpu(gpu: Gpu): Observable<Gpu> {
    const headers = this.createAuthHeader();
    const body = { brand: gpu.brand,
                   producer: gpu.producer,
                   series: gpu.series,
                   model: gpu.model,
                   vram: gpu.vram,
                   memoryInterface: gpu.memoryInterface};
    return this.http.post<Gpu>(POST_GPU_URL, body, {headers});
  }

  /**********************************\
   ==================================

                  PSU

   ==================================
  \**********************************/

  getPsu(cpuId: number): Observable<Psu> {
    const headers = this.createAuthHeader();
    const body = { typeId: cpuId};
    return this.http.post<Psu>(GET_PSU_URL, body ,{headers});
  }

  addPsu(psu: Psu): Observable<Psu> {
    const headers = this.createAuthHeader();
    const body = { watt: psu.watt,
                   efficiency: psu.efficiency,
                   modular: psu.modular,
                   type: psu.type,
                   pcieGen5Support: psu.pcieGen5Support,
                   brand: psu.brand,
                   model: psu.model};
    return this.http.post<Psu>(POST_PSU_URL, body, {headers});
  }

  /**********************************\
   ==================================

                  RAM

   ==================================
  \**********************************/

  getRam(cpuId: number): Observable<Ram> {
    const headers = this.createAuthHeader();
    const body = { typeId: cpuId};
    return this.http.post<Ram>(GET_RAM_URL, body ,{headers});
  }

  addRam(ram: Ram): Observable<Ram> {
    const headers = this.createAuthHeader();
    const body = { type: ram.type,
                   capacity: ram.capacity,
                   frequencySpeed: ram.frequencySpeed,
                   channelType: ram.channelType,
                   compatibility: ram.compatibility,
                   brand: ram.brand,
                   model: ram.model};
    return this.http.post<Ram>(POST_RAM_URL, body, {headers});
  }

   /**********************************\
    ==================================

                Motherboard

    ==================================
   \**********************************/


  getMotherboard(cpuId: number): Observable<Motherboard> {
    const headers = this.createAuthHeader();
    const body = { typeId: cpuId};
    return this.http.post<Motherboard>(GET_MOTHERBOARD_URL, body ,{headers});
  }

  addMotherboard(motherboard: Motherboard): Observable<Motherboard> {
    const headers = this.createAuthHeader();
    const body = { cpuSocketType: motherboard.cpuSocketType,
                   cpuCompatibility: motherboard.cpuCompatibility,
                   ramType: motherboard.ramType,
                   size: motherboard.size,
                   ramSlots: motherboard.ramSlots,
                   brand: motherboard.brand,
                   model: motherboard.model};
    return this.http.post<Motherboard>(POST_MOTHERBOARD_URL, body, {headers});
  }

   /**********************************\
    ==================================

              Desktop Case

    ==================================
   \**********************************/

  getDesktopCase(cpuId: number): Observable<DesktopCase> {
    const headers = this.createAuthHeader();
    const body = { typeId: cpuId};
    return this.http.post<DesktopCase>(GET_DESKTOPCASE_URL, body ,{headers});
  }

  addDesktopCase(desktopCase: DesktopCase): Observable<DesktopCase> {
    const headers = this.createAuthHeader();
    const body = { brand: desktopCase.brand,
                   psu: desktopCase.psu,
                   psuLocation: desktopCase.psuLocation,
                   transparent: desktopCase.transparent,                   
                   psuWatt: desktopCase.psuWatt,
                   model: desktopCase.model,
                   type: desktopCase.type};
    return this.http.post<DesktopCase>(POST_DESKTOPCASE_URL, body, {headers});
  }
}

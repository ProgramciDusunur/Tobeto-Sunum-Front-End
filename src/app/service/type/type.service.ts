import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Cpu, CpuCooler, DesktopCase, Gpu, Motherboard, Psu, Ram } from '../models/type.model';
import { Observable } from 'rxjs';


 const GET_CPU_URL = environment.serverURL+'/type/cpu/get';
 const GET_CPUCOOLER_URL = environment.serverURL+'/type/cpucooler/get';
 const GET_GPU_URL = environment.serverURL+'/type/gpu/get';
 const GET_PSU_URL = environment.serverURL+'/type/psu/get';
 const GET_RAM_URL = environment.serverURL+'/type/ram/get';
 const GET_MOTHERBOARD_URL = environment.serverURL+'/type/motherboard/get';
 const GET_DESKTOPCASE_URL = environment.serverURL+'/type/case/get';

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


  getCpu(cpuId: number): Observable<Cpu> {
    const headers = this.createAuthHeader();
    const body = { typeId: cpuId};
    return this.http.post<Cpu>(GET_CPU_URL, body ,{headers});
  }

  getCpuCooler(cpuCoolerId: number): Observable<CpuCooler> {
    const headers = this.createAuthHeader();
    const body = { typeId: cpuCoolerId};
    return this.http.post<CpuCooler>(GET_CPUCOOLER_URL, body ,{headers});
  }

  getGpu(cpuId: number): Observable<Gpu> {
    const headers = this.createAuthHeader();
    const body = { typeId: cpuId};
    return this.http.post<Gpu>(GET_GPU_URL, body ,{headers});
  }

  getPsu(cpuId: number): Observable<Psu> {
    const headers = this.createAuthHeader();
    const body = { typeId: cpuId};
    return this.http.post<Psu>(GET_PSU_URL, body ,{headers});
  }

  getRam(cpuId: number): Observable<Ram> {
    const headers = this.createAuthHeader();
    const body = { typeId: cpuId};
    return this.http.post<Ram>(GET_RAM_URL, body ,{headers});
  }

  getMotherboard(cpuId: number): Observable<Motherboard> {
    const headers = this.createAuthHeader();
    const body = { typeId: cpuId};
    return this.http.post<Motherboard>(GET_MOTHERBOARD_URL, body ,{headers});
  }

  getDesktopCase(cpuId: number): Observable<DesktopCase> {
    const headers = this.createAuthHeader();
    const body = { typeId: cpuId};
    return this.http.post<DesktopCase>(GET_DESKTOPCASE_URL, body ,{headers});
  }
}

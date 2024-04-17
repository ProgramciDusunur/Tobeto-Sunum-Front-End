import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Shelf } from '../models/shelf.model';



@Injectable({ providedIn: 'root' })
export class LoginService {
  loggedIn = false;
  globalLogin = false;
  token = "";
  email = "";
  password = "";
  kullanicilarId = "";
  roller: string[] = [];
  apiUrl = environment.serverURL;


  constructor(private http: HttpClient) {    
   }


   createAuthorizationHeader(headers: HttpHeaders) {
    
    headers.append('Authorization', 'Bearer ' + "eyJhbGciOiJIUzUxMiJ9.eyJyb2xsZXIiOiJhZG1pbiJ9.NVYeBGDocnb8grigojndDasa-TstTKMIO909UygZ-42JMlSfOIbB--AhisXTqAA1kjTqJu7KhNuAi1p0wU7v2g");    
    
  }

  get(url: string): Observable<any> {
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, { headers: headers });
  }

  post(url: string): Observable<any> {
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);    
    console.log(headers);
    return this.http.post(url, { headers: headers });
  }






   /*******************************/

   login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xsZXIiOiJhZG1pbiJ9.NVYeBGDocnb8grigojndDasa-TstTKMIO909UygZ-42JMlSfOIbB--AhisXTqAA1kjTqJu7KhNuAi1p0wU7v2g',      
    });

    // HTTP isteği oluştururken headers parametresine oluşturduğumuz header'ları ekleyin
    return this.http.post<any>(this.apiUrl+'/login', {email, password} ,{ headers }).pipe(
      map(resp => {
        this.processLoginResponse(resp, email, password);        
        return resp;
      })
    );
  }

  processLoginResponse(data: any, email: string, password: string) {
    /*this.loggedIn = true;
    this.token = data.token;
    this.email = email;
    this.password = password;
    localStorage.setItem('token', data.token);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    let payload = this.parseJwt(this.token);
    this.roles = payload.roller;
    this.userId = payload.kullanicilarId;*/
  }
  relogin():Observable<any> {
    return this.login(this.email, this.password);
  }
  logout() {
    this.loggedIn = false;
    this.token = "";
    this.email = "";
    this.password = "";
    this.kullanicilarId = "";
    this.roller = [];
    localStorage.clear();
  }
  parseJwt (token: string) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  userHasRole(roleAdi: string): boolean {
    let hasRole = false;
    this.roller.forEach(rol => {
      if (rol === roleAdi) {
        hasRole = true;
      }
    })
    return hasRole;
  }

}

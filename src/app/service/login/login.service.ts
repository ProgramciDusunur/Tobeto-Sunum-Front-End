import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';





@Injectable({ providedIn: 'root' })
export class LoginService {
  loggedIn = false;  
  token = "";
  email = "";
  password = "";
  kullanicilarId = "";
  payload="";
  username = "";
  surname = "";
  rol: string = "";
  


  constructor(private http: HttpClient) {    
   }

   /*******************************/

   login(email: string, password: string): Observable<any> {
    
    
    // HTTP isteği oluştururken headers parametresine oluşturduğumuz header'ları ekleyin
    return this.http.post<any>('/login', {email, password} ).pipe(
      map(resp => {
        this.processLoginResponse(resp, email, password);        
        return resp;
      })
    );
  }

  processLoginResponse(data: any, email: string, password: string) {
    this.loggedIn = true;
    this.token = data.token;
    this.email = email;
    this.password = password;
    localStorage.setItem('token', data.token);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    this.payload = this.parseJwt(this.token);        
    const testJsonString = JSON.stringify(this.payload);
    const payloadObject = JSON.parse(testJsonString);    
    const jti = payloadObject.jti;
    const sub = payloadObject.sub;
    const role = payloadObject.roller;
    this.username = jti;
    this.surname = sub;
    this.rol = role;              
  }
  
  logout() {
    this.loggedIn = false;
    this.token = "";
    this.email = "";
    this.password = "";
    this.kullanicilarId = "";
    this.rol = "";
    this.payload = "";
    this.username = "";
    this.surname = "";
    this.rol = "";
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
  
  
}

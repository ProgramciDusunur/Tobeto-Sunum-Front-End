import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  let url = req.url;
  let headers = req.headers;
  let apiUrl = environment.serverURL;
  const token = localStorage.getItem("token");
  if (!url.startsWith('/assets/')) {
    url = apiUrl + url;
    headers = headers.append('Authorization', 'Bearer ' + token);
  }
  let newReq = req.clone({
    url,
    headers,
  });
  return next(newReq);
  
};

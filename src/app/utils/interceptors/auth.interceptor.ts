import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('bearerToken'); // Asumiendo que el token se guarda en localStorage

  
  if (req.url.includes(environment.apiUrl)) {


    if (token) {
      const cloned = req.clone({
        
        headers: req.headers.set('Authorization', `Bearer ${token}`)
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        .set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
      });

      return next(cloned);
    } else {
      return next(req);
    }
  }
  return next(req);

};

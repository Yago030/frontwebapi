import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Si es una solicitud de acceso, continúa sin añadir el token
  if (req.url.indexOf("Acceso") > 0) {
    return next(req);
  }

  // Obtiene el token del localStorage
  const token = localStorage.getItem("token");

  // Clona la solicitud y añade el header de autorización si el token existe
  const clonRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  // Envía la solicitud clonada
  return next(clonRequest);
};

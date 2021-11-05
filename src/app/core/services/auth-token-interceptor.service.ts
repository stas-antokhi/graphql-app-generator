import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CredentialsService } from './credentials.service';

@Injectable()
export class AuthTokenInterceptorService implements HttpInterceptor {

  constructor(private credentials: CredentialsService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.withCredentials) {
      console.log('with')
    }
    const credentials = this.credentials.getCredentials();
    const basicAuthHeader = req.headers.append(
      'Authentication',
      'Basic' + btoa(`${credentials.username}:${credentials.password}`)
    );

    const reqWithAuthHeaders = req.clone({
      headers: basicAuthHeader
    });

    console.log('LOG REQ', reqWithAuthHeaders)

    return next.handle(req.clone({headers: basicAuthHeader}));
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CredentialsService } from '../services/credentials.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HasCredentialsGuard implements CanActivate {

  constructor(private credentialSvc: CredentialsService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.credentialSvc.hasCredentials().pipe(
      map(hasCredentials => {
        if(hasCredentials) {
          return true;
        } else {
          this.router.navigate(['credentials']);
          return false;
        }
      })
    );
  }

}

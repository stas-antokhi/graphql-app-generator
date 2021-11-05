import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of} from 'rxjs';
import { Credentials } from 'src/app/shared/models/Credentials';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  private credentials$ = new BehaviorSubject<Credentials>({} as Credentials);

  private hasCredentials$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  setCredentials(credentials: Credentials): Observable<boolean> {
    return this.testCredentials(credentials).pipe(
      map(resp => {
        if(resp.status === 200) {
          this.credentials$.next(credentials);
          this.hasCredentials$.next(true);
          return true;
        } else {
          return false;
        }
      }),
    );

  }

  getCredentials(): Credentials {
    return this.credentials$.getValue();
  }

  hasCredentials(): Observable<boolean> {
    return this.hasCredentials$.asObservable();
  }

  private testCredentials(credentials: Credentials): Observable<HttpResponse<any>> {
    const header  = {'Authorization': 'Basic ' + btoa(`${credentials.username}:${credentials.password}`)}

    return this.http.get(`${credentials.url}/`, {
      headers: header,
      observe: 'response'
    });
  }

}

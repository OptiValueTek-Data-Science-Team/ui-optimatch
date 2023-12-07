

import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { Deferred } from '../defers.service';
interface Response {
  response: string;
  token: string;
  name: string;
  role: string;
  id: number;
  email: string;
  profile_image_url: string;
  remember_me: boolean;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DatatransferService {

  constructor(private http:HttpClient) { }
  get(api: string): Observable<any> {
    return this.http.get(api).pipe(
      map(
        (response: any) => response,
        (error: Error) => {
          throw error;
        }
      )
    );
  }
  post(api: string, payload: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'

    });

    return this.http.post(api, JSON.stringify(payload), { headers });
  }
  // post(formName: string, user: any): Observable<any> {
  //   const headers: HttpHeaders = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //   });

  //   return this.http.post(formName, JSON.stringify(user), { headers }).pipe(
  //     map(
  //       (response: any) => response,
  //       (error: Error) => {
  //         throw error;
  //       }
  //     )
  //   );
  // }

  

 
 
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getTherapists = (page:number):Observable<any> => {
    return this.http.get<any>(`${this.apiUrl}/get-therapists?page=${page}`)
  }

  approveTherapists = (therapistID:any):Observable<any> => {
    return this.http.post<any>(`${this.apiUrl}/approve-therapist/${therapistID}`,{})
  }
}

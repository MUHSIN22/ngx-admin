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

  getCourseCount = ():Observable<any> => {
    return this.http.get<any>(`${this.apiUrl}/course-counts`)
  }

  getStatisticsCount = ():Observable<any> => {
    return this.http.get<any>(`${this.apiUrl}/total-counts`)
  }

  getTransactions = (page:number):Observable<any> => {
    return this.http.get<any>(`${this.apiUrl}/get-transactions?page=${page}`)
  }

  getTherapists = (page:number):Observable<any> => {
    return this.http.get<any>(`${this.apiUrl}/get-therapists?page=${page}`)
  }

  approveTherapists = (therapistID:any):Observable<any> => {
    return this.http.post<any>(`${this.apiUrl}/approve-therapist/${therapistID}`,{})
  }

  rejectTherapists = (therapistID:any):Observable<any> => {
    return this.http.post<any>(`${this.apiUrl}/reject-therapist/${therapistID}`,{})
  }

  getCourses = (page:number):Observable<any> => {
    return this.http.get<any>(`${this.apiUrl}/get-courses?page=${page}`)
  }

  approveCourses = (courseID:any):Observable<any> => {
    return this.http.post<any>(`${this.apiUrl}/approve-course/${courseID}`,{})
  }

  rejectCourse = (courseID:any):Observable<any> => {
    return this.http.post<any>(`${this.apiUrl}/reject-course/${courseID}`,{})
  }
}

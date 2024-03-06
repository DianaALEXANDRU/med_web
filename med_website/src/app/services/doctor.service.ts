   import { Injectable } from '@angular/core';
import { Doctor } from '../models/doctor.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private apiUrl = 'http://127.0.0.1:5000/doctors'; 

  constructor(private http: HttpClient) { }

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.apiUrl);
  }

}

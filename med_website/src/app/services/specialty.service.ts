import { Injectable } from '@angular/core';
import { Specialty } from '../models/specialty.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {

  private apiUrl = 'http://127.0.0.1:5000/specialties'; 

  constructor(private http: HttpClient) { }

  getAllSpecialties(): Observable<Specialty[]> {
    return this.http.get<Specialty[]>(this.apiUrl);
  }

  getSpecialtyById(id: number): Observable<Specialty> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Specialty>(url);
  }

}

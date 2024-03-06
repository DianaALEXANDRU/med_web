import { Injectable } from '@angular/core';
import { MedicalService } from '../models/medical-service.model';
import { SpecialtyService } from './specialty.service';
import { Specialty } from '../models/specialty.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicalServiceService {

  private apiUrl = 'http://127.0.0.1:5000/services'; 

  constructor(
    private http: HttpClient,
    private specialtyService: SpecialtyService
  ) { }

  getMedicalServices(): Observable<MedicalService[]> {
    return this.http.get<MedicalService[]>(this.apiUrl);
  }

  getSpecialtyForMedicalService(medicalService: MedicalService): Observable<Specialty | undefined> {

    return this.specialtyService.getSpecialtyById(medicalService.specialty_id);
  }
  
}

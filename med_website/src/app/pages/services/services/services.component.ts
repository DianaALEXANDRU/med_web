import { Component } from '@angular/core';
import { Specialty } from '../../../models/specialty.model';
import { SpecialtyService } from '../../../services/specialty.service';
import { MedicalService } from '../../../models/medical-service.model';
import { MedicalServiceService } from '../../../services/medical-service.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {


  specialties: Specialty[] = [];
  medicalServices: MedicalService[] = [];
  selectedSpecialty: string = '0'; 

  
  constructor(
    private specialtyService: SpecialtyService,
    private medicalServiceService: MedicalServiceService
  ) {}

  ngOnInit(): void {
    this.getSpecialties();
    this.getMedicalServices();

  }

  getSpecialties(): void {
    this.specialtyService.getAllSpecialties()
      .subscribe(specialties => this.specialties = specialties);
  }

  
  getMedicalServices(): void {
    this.medicalServiceService.getMedicalServices()
      .subscribe(services => this.medicalServices=services);

      console.log(this.medicalServices);
  }

  getMedicalServicesForSpecialty(specialty: Specialty): MedicalService[] {
    return this.medicalServices.filter(service => service.specialty_id === specialty.id);

    
  }
 


  get filteredSpeciality(): Specialty[] {
    return this.specialties.filter(sp =>
       (this.selectedSpecialty === '0' || sp.name === this.selectedSpecialty)
     );
    }

}

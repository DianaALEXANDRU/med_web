import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../models/doctor.model';
import { DoctorService } from '../../services/doctor.service';
import { Specialty } from '../../models/specialty.model';
import { SpecialtyService } from '../../services/specialty.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  searchTerm: string = '';
  selectedSpecialty: string = '0'; 
  doctors: Doctor[] = [];
  specialties: Specialty[] = [];
  itemsPerPage: number = 12; // Number of doctors to display per page
  currentPage: number = 1; // Current page number
  totalPages: number = 0;

  constructor(
    private doctorService: DoctorService,
    private specialtyService: SpecialtyService
  ) {}

  ngOnInit(): void {
    this.getDoctors();
    this.getSpecialties();
    this.calculateTotalPages();
  }

  

  getDoctors(): void {
    this.doctorService.getDoctors()
      .subscribe(doctors => {
        this.doctors = doctors;
        this.calculateTotalPages();
      });
  }


  getSpecialties(): void {
    this.specialtyService.getAllSpecialties()
      .subscribe(specialties => this.specialties = specialties);
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.doctors.length / this.itemsPerPage);
  }

  get filteredDoctors(): Doctor[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.doctors
      .filter(doctor =>
        doctor.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        (this.selectedSpecialty === '0' || doctor.specialty === this.selectedSpecialty)
      )
      .slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.calculateTotalPages();
  }

  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

}

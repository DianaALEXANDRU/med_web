import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  name: string = '';
  email: string = '';
  message: string = '';

  constructor(private http: HttpClient) {}

  sendDataToBackend() {
    const data = {
      name: this.name,
      email: this.email,
      message: this.message
    };

   
    this.http.post('http://127.0.0.1:5000/submit-message', data)
      .subscribe(()=>{
        this.clearForm();
    
      }
      );

      
  }
  clearForm() {
    this.name = '';
    this.email = '';
    this.message = '';
  }

}

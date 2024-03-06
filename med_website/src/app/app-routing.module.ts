import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { ServicesComponent } from './pages/services/services/services.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'services', component: ServicesComponent},
  {path:'doctors', component: DoctorsComponent},
  {path:'contact', component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

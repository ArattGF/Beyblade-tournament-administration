import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule,ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;
  statesMexico =[
    'Aguascalientes',
    'Baja California',
    'Baja California Sur',
    'Campeche',
    'Chiapas',
    'Chihuahua',
    'Ciudad de México',
    'Coahuila',
    'Colima',
    'Durango',
    'Estado de México',
    'Guanajuato',
    'Guerrero',
    'Hidalgo',
    'Jalisco',
    'Michoacán',
    'Morelos',
    'Nayarit',
    'Nuevo León',
    'Oaxaca',
    'Puebla',
    'Querétaro',
    'Quintana Roo',
    'San Luis Potosí',
    'Sinaloa',
    'Sonora',
    'Tabasco',
    'Tamaulipas',
    'Tlaxcala',
    'Veracruz',
    'Yucatán',
    'Zacatecas'
  ];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder, 
    private readonly registerService: RegisterService,
    private readonly router: Router
  ){
    this.registerForm = this.fb.group({
      name:['', [Validators.required, Validators.minLength(3)]],
      region: ['', Validators.required]
    });
  }



  onSubmit() {
    if (this.isSubmitting) return;
 
    this.isSubmitting = true;

    if (this.registerForm.valid) {
        this.registerService.CreateParticipant({
            ...this.registerForm.value,
            tournamentID: this.getTournamentID()
        }).then(dataParticipant => {
            HeaderComponent.showAlert(dataParticipant.message);
            this.isSubmitting = false;  // Restablece en éxito
            this.registerForm.reset();
        }).catch((error: any) => {
            HeaderComponent.showAlert(error.error, 'rgb(205, 46, 25)', 'black');
            this.isSubmitting = false;  // ¡Agrega esto en el catch!
        });
    } else {
        this.isSubmitting = false;  // Si el formulario es inválido
    }
}
  getTournamentID(): string{
    return new URLSearchParams(window.location.search).get('tournamentId') || '';
  }

  StartGroupStage() {
    console.log(this.getTournamentID());
    
    this.registerService.StartGroupStage(this.getTournamentID()).then(data =>{
      console.log(data);
      
      HeaderComponent.showAlert(data.message);
      this.router.navigate(["group-stage"], {queryParams: { tournamentId: this.getTournamentID()}})
    })
    }
}
 
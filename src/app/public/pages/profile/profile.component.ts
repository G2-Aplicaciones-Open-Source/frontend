import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [
    FormsModule,
    NgIf
  ]
})
export class ProfileComponent {
  user = {
    first_name: 'Jesús Ignacio Carlos III',
    last_name: 'Cruz Livaque Mur',
    phone_number: '+51 977 886 633',
    email: 'correo@dominio.com',
    photo_url: 'https://i.pinimg.com/236x/06/83/36/0683362c736dce33c4678e5bd5e394b7.jpg', // coloca aquí tu imagen de prueba
  };

  showSuccessMessage = false;

  onSave() {
    this.showSuccessMessage = true;
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
  }

  onChangePhoto() {
    alert('Funcionalidad de cambiar foto se añadirá posteriormente.');
  }
}

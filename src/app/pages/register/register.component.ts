import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

register(): void {
  this.authService.register(this.email, this.password)
    .then(() => {
      console.log('Usuario registrado con éxito');
      this.successMessage = 'Usuario registrado con éxito';
      this.errorMessage = '';

      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 2500); // 2.5 segundos para rediriguir al inicio
    })
    .catch(error => {
      console.error('Error al registrar:', error);
      this.errorMessage = 'No se pudo registrar el usuario';
      this.errorMessage = error.message;
      this.successMessage = '';
    });
}
}
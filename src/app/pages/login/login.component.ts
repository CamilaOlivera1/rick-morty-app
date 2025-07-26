import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

login(): void {
  this.authService.login(this.email, this.password)
    .then(() => {
      console.log('Inicio de sesión exitoso');
      this.successMessage = 'Inicio de sesión exitoso';
      this.errorMessage = '';

      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 2500);
    })
    .catch(error => {
      console.error('Error al iniciar sesión:', error);
      this.errorMessage = 'Credenciales incorrectas o error al iniciar sesión';
      this.successMessage = '';
    });
}
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  firstName = ''; lastName = ''; email = ''; phone = ''; password = ''; confirmPassword = '';
  loading = false; error = ''; success = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    if (this.password !== this.confirmPassword) { this.error = 'Les mots de passe ne correspondent pas.'; return; }
    this.loading = true; this.error = '';
    this.authService.register({
      firstName: this.firstName, lastName: this.lastName,
      email: this.email, phone: this.phone, password: this.password
    }).subscribe({
      next: () => { this.loading = false; this.success = 'Compte créé ! Vérifiez votre email pour confirmer.'; },
      error: () => { this.loading = false; this.error = 'Erreur lors de la création du compte.'; }
    });
  }
}

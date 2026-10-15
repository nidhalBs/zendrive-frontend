import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-client-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ClientProfileComponent implements OnInit {
  user: User | null = null;
  firstName = ''; lastName = ''; phone = '';
  successMsg = '';

  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    if (this.user) {
      this.firstName = this.user.firstName;
      this.lastName = this.user.lastName;
      this.phone = this.user.phone || '';
    }
  }

  updateProfile(): void {
    this.userService.updateProfile({ firstName: this.firstName, lastName: this.lastName, phone: this.phone }).subscribe({
      next: () => { this.successMsg = 'Profil mis à jour avec succès !'; },
      error: () => { this.successMsg = ''; }
    });
  }
}

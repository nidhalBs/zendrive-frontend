import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { AdminService } from '../../../core/services/admin.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  searchTerm = '';
  roleFilter = '';
  currentPage = 0;
  totalPages = 1;
  totalElements = 0;

  constructor(private userService: UserService, private adminService: AdminService) {}

  ngOnInit(): void { this.loadUsers(); }

  loadUsers(): void { this.loadPage(0); }

  loadPage(page: number): void {
    this.adminService.getAllUsers(page, 15, this.roleFilter, this.searchTerm).subscribe(res => {
      if (res.success) {
        this.users = res.data.content;
        this.totalPages = res.data.totalPages;
        this.totalElements = res.data.totalElements;
        this.currentPage = res.data.number;
      }
    });
  }

  changeRole(u: User, newRole: string): void {
    this.adminService.updateUserRole(u.id, newRole).subscribe(() => u.role = newRole as any);
  }

  toggleActive(u: User): void {
    this.adminService.toggleUserActive(u.id).subscribe(() => { u.active = !u.active; });
  }

  deleteUser(u: User): void {
    if (confirm(`Supprimer l'utilisateur "${u.firstName} ${u.lastName}" ?`)) {
      this.adminService.deleteUser(u.id).subscribe(() => this.loadPage(this.currentPage));
    }
  }
}

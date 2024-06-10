import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/usuario.model';
import { UserService } from '../../../services/usuario.service';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
    //BrowserAnimationsModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];
  expandedUser: User | null = null;

  // expandedSection: 'telephones' | 'addresses' | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  navigateToAddTelephone(userId: number): void {
    this.router.navigate([`/users/${userId}/telephones/new`]);
  }

  navigateToAddAddress(userId: number): void {
    this.router.navigate([`/users/${userId}/addresses/new`]);
  }

  toggleExpansion(user: User): void {
    this.expandedUser = this.expandedUser === user ? null : user;
  }

  isExpansionDetailRow = (index: number, row: User): boolean => {
    return row.hasOwnProperty('detailRow');
  }
}

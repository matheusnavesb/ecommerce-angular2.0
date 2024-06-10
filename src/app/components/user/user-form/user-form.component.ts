import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Address, Telephone, User } from '../../../model/usuario.model';
import { UserService } from '../../../services/usuario.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;
  userId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      telephones: this.fb.array([]),
      addresses: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = Number(params.get('id'));
      if (this.userId) {
        this.userService.getUserById(this.userId).subscribe((user) => {
          this.userForm.patchValue(user);
          this.setTelephones(user.telephones);
          this.setAddresses(user.addresses);
        });
      }
    });
  }

  get telephones(): FormArray {
    return this.userForm.get('telephones') as FormArray;
  }

  get addresses(): FormArray {
    return this.userForm.get('addresses') as FormArray;
  }

  setTelephones(telephones: Telephone[]): void {
    const telephoneFGs = telephones.map(t => this.fb.group(t));
    const telephoneFormArray = this.fb.array(telephoneFGs);
    this.userForm.setControl('telephones', telephoneFormArray);
  }

  setAddresses(addresses: Address[]): void {
    const addressFGs = addresses.map(a => this.fb.group(a));
    const addressFormArray = this.fb.array(addressFGs);
    this.userForm.setControl('addresses', addressFormArray);
  }

  addTelephone(): void {
    this.telephones.push(this.fb.group({
      codeCountry: ['', Validators.required],
      codeState: ['', Validators.required],
      number: ['', Validators.required]
    }));
  }

  removeTelephone(index: number): void {
    this.telephones.removeAt(index);
  }

  addAddress(): void {
    this.addresses.push(this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      country: ['', Validators.required]
    }));
  }

  removeAddress(index: number): void {
    this.addresses.removeAt(index);
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const user: User = this.userForm.value;
      if (this.userId) {
        this.userService.updateUser(this.userId, user).subscribe(() => {
          this.router.navigate(['/users']);
        });
      } else {
        this.userService.createUser(user).subscribe(() => {
          this.router.navigate(['/users']);
        });
      }
    }
  }
}

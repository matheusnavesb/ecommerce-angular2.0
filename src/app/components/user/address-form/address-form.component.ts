import { Component, Input, OnInit } from '@angular/core';
import { Address } from '../../../model/usuario.model';
import { UserService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.css'
})
export class AddressFormComponent implements OnInit {
  addressForm: FormGroup;
  userId: number | null = null;
  addressId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.addressForm = this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = Number(params.get('userId'));
      this.addressId = Number(params.get('addressId'));
      if (this.addressId) {
        this.userService.getAddress(this.userId!, this.addressId).subscribe((address) => {
          this.addressForm.patchValue(address);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      if (this.addressId) {
        this.userService.updateAddress(this.userId!, this.addressId, this.addressForm.value).subscribe(() => {
          this.router.navigate([`/users/${this.userId}`]);
        });
      } else {
        this.userService.addAddress(this.userId!, this.addressForm.value).subscribe(() => {
          this.router.navigate([`/users/${this.userId}`]);
        });
      }
    }
  }
}

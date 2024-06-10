import { Component, Input, OnInit } from '@angular/core';
import { Telephone } from '../../../model/usuario.model';
import { UserService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-telephone-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './telephone-form.component.html',
  styleUrl: './telephone-form.component.css'
})
export class TelephoneFormComponent implements OnInit {
  telephoneForm: FormGroup;
  userId: number | null = null;
  telephoneId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.telephoneForm = this.fb.group({
      codeCountry: ['', Validators.required],
      codeState: ['', Validators.required],
      number: ['', Validators.required],
    });

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = Number(params.get('userId'));
      this.telephoneId = Number(params.get('telephoneId'));
      if (this.telephoneId) {
        this.userService.getTelephone(this.userId!, this.telephoneId).subscribe((telephone) => {
          this.telephoneForm.patchValue(telephone);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.telephoneForm.valid) {
      if (this.telephoneId) {
        this.userService.updateTelephone(this.userId!, this.telephoneId, this.telephoneForm.value).subscribe(() => {
          this.router.navigate([`/users/${this.userId}`]);
        });
      } else {
        this.userService.addTelephone(this.userId!, this.telephoneForm.value).subscribe(() => {
          this.router.navigate([`/users/${this.userId}`]);
        });
      }
    }
  }
}

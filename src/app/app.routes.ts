import { Routes } from '@angular/router';
import { UserFormComponent } from './components/user/user-form/user-form.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { AddressFormComponent } from './components/user/address-form/address-form.component';
import { TelephoneFormComponent } from './components/user/telephone-form/telephone-form.component';

export const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'users/new', component: UserFormComponent },
  { path: 'users/:id/edit', component: UserFormComponent },
  { path: 'users/:userId/telephones/new', component: TelephoneFormComponent },
  { path: 'users/:userId/telephones/:telephoneId/edit', component: TelephoneFormComponent },
  { path: 'users/:userId/addresses/new', component: AddressFormComponent },
  { path: 'users/:userId/addresses/:addressId/edit', component: AddressFormComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' }
];

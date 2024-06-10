import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, Telephone, Address } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addTelephone(userId: number, telephone: Telephone): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/${userId}/telephones`, telephone);
  }

  updateTelephone(userId: number, telephoneId: number, telephone: Telephone): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}/telephones/${telephoneId}`, telephone);
  }

  getTelephone(userId: number, telephoneId: number): Observable<Telephone> {
    return this.http.get<Telephone>(`${this.apiUrl}/${userId}/telephones/${telephoneId}`);
  }

  addAddress(userId: number, address: Address): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/${userId}/addresses`, address);
  }

  updateAddress(userId: number, addressId: number, address: Address): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}/addresses/${addressId}`, address);
  }

  getAddress(userId: number, addressId: number): Observable<Address> {
    return this.http.get<Address>(`${this.apiUrl}/${userId}/addresses/${addressId}`);
  }
}

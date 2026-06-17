import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = 'http://localhost:3000/api';
  private tokenKey = 'travlr-token';

  constructor(private http: HttpClient) { }

  public getToken(): string {
    return localStorage.getItem(this.tokenKey) || '';
  }

  public saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  public logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  public getCurrentUser(): User | null {
    if (!this.isLoggedIn()) {
      return null;
    }
    const token = this.getToken();
    const payload = JSON.parse(atob(token.split('.')[1]));
    return { email: payload.email, name: payload.name } as User;
  }

  public login(user: User, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, {
      email: user.email,
      password: password
    });
  }

  public register(user: User, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, {
      name: user.name,
      email: user.email,
      password: password
    });
  }
}

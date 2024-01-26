import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private token: string | null = null;
    private role: string | null = null;

    constructor(private http: HttpClient) {
        this.token = localStorage.getItem('token');
        this.role = localStorage.getItem('role');
    }

    login(userName: string, password: string) {
        this.http
            .post('http://localhost:8008/api/users/login', {
                userName,
                password,
            })
            .subscribe((res: { token: string; role: string }) => {
                console.log(res);
                this.token = res.token;
                this.role = res.role;
                localStorage.setItem('token', res.token);
                localStorage.setItem('role', res.role);
            });
    }

    logout(): void {
        this.token = null;
        this.role = null;
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    }

    isAuthenticated(): boolean {
        return !!this.token;
    }
    
    getRole(): string | null {
        return this.role;
    }
}

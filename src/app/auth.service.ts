import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    isLogin = false;

    roleAs: string;

    constructor() {}

    login(value: string) {
        return new Promise((resolve, reject) => {
            this.isLogin = true;
            this.roleAs = value;
            localStorage.setItem('STATE', 'true');
            localStorage.setItem('ROLE', this.roleAs);
            resolve({ success: this.isLogin, role: this.roleAs });
        });
    }

    logout() {
        return new Promise((resolve, reject) => {
            this.isLogin = false;
            this.roleAs = '';
            localStorage.setItem('STATE', 'false');
            localStorage.setItem('ROLE', '');
            resolve({ success: this.isLogin, role: '' });
        });
    }

    isLoggedIn() {
        const loggedIn = localStorage.getItem('STATE');
        if (loggedIn == 'true') this.isLogin = true;
        else this.isLogin = false;
        return this.isLogin;
    }

    getRole() {
        this.roleAs = localStorage.getItem('ROLE');
        return this.roleAs;
    }
}

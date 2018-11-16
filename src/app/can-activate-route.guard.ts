import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, RouterEvent } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

import { AuthService } from '@app/services/auth/auth.service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {
    
    constructor(private auth: AuthService, private router: Router, public snackbar: MatSnackBar) {

    }
    
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.auth.isAuthenticated) {
            this.router.navigateByUrl('login');
            return false;
        } else {
            return true;
        }
    }

    canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.auth.isAuthenticated) {
            this.snackbar.open('You are not signed in', 'Close', {
                duration: 3000
            })
            this.router.navigateByUrl('login');
            return false;
        } else {
            return true;
        }
    }
    
}
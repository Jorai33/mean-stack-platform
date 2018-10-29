import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { SortByPipe } from './pipes/sort-by/sort-by.pipe';

import { ElectronService } from 'ngx-electron';

import { AuthService } from '@app/services/auth/auth.service';
import { NotificationsService } from '@app/services/notifications/notifications.service';
import { UsersService } from '@app/services/users/users.service';
import { TaxCodesService } from '@app/services/tax-codes/tax-codes.service';

import { NotificationsComponent } from './notifications/notifications.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})

export class AppComponent {
	
	constructor(private router: Router, public auth: AuthService, private notifs: NotificationsService, private users: UsersService, private taxCodes: TaxCodesService) {
            
            
		
	}
	
	ngOnInit() {
            
	}
    
    get isAuthenticated(): boolean {
        return this.auth.isAuthenticated;
    }
      
}
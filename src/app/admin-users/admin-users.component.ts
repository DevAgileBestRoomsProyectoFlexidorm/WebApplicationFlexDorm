import { Component } from '@angular/core';
import { Account } from 'src/app/models/account.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent {
  accounts: Account[] = [];
  constructor(private accountService: AdminService) { }

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe(
      (response) => {
        if (response && response.data) {
          this.accounts = response.data;

        }
      },
      (error) => {
        console.error('Error fetching accounts', error);
      }
    );

  }

  toggleAccountStatus(account: Account): void {
    const newStatus = account.active;
    this.accountService.switchActivate(account.userId, newStatus).subscribe(
      (response) => {
        if (response && response.data) {
        }
      },
      (error) => {
        console.error('Error updating account status', error);
      }
    );
  }
}

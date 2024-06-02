import { Component } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Account } from 'src/app/models/account.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  edit = false;
  accountData: Account = {} as Account;

  constructor(private profileService: ProfileService) {}

  editar(): void {
    this.edit = true;
  }

  close(){
    this.edit = false;
  }

  ngOnInit() {
    this.getAccountData();
  }

  getAccountData() {
    let userData = this.profileService.getAccountDataFromLocalStorage();
    if (userData) {
      this.accountData = userData;
    } else {
      this.accountData = {} as Account;
      console.error('Error al obtener los datos del perfil:');
    }
    
  }

  updateAccountData(){
    this.profileService.updateAccountData(this.accountData).subscribe(
      (response) => {
        console.log('Datos de usuario actualizados', response);
        this.edit = false;
      },
      (error) => {
        console.error('Error al guardar los cambios:', error);
      }
    );
  }

}

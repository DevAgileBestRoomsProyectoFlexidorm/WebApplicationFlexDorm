import { Component } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { Account } from 'src/app/models/account.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isNavListHidden = false;
  userData: Account = {} as Account;

  toggleNavList() {
    this.isNavListHidden = !this.isNavListHidden;
  }

  isLoginPage: boolean = false;

  constructor(private router: Router, private authService:AuthService, private profileService:ProfileService) {
    // Suscribirse a eventos de cambio de ruta
    router.events.subscribe((event) => {
      const type=localStorage.getItem('type')
      switch(type){
        case 'Student':
          this.studentNav=true;
          this.arrenderNav=false;
          this.adminNav=false;
        break;
        case 'Arrender':
          this.arrenderNav=true;
          this.studentNav=false;
          this.adminNav=false;
          break;
        case 'User':
          this.arrenderNav=false;
          this.studentNav=false;
          this.adminNav=true;
          break;

      }
      if (event instanceof NavigationEnd) {
        // Verificar si estamos en la página de 'login'
        this.getAccountData();
        this.isLoginPage = event.url === '/login' || event.url === '/register';
      }
    });
  }

  studentNav=false;
  arrenderNav=false;
  adminNav=false;

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
  }

  getAccountData() {
    let userData = this.profileService.getAccountDataFromLocalStorage();
    if (userData) {
      this.userData = userData;
    } else {
      this.userData = {} as Account;
      console.error('Error al obtener los datos del perfil:');
    }

  }

}

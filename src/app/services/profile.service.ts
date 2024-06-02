import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Account } from '../models/account.model';
import { ApiResponse, ApiResponseStatus } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private userData;
  private token ;
  private headers;

  constructor(private http: HttpClient) {
    this.userData = localStorage.getItem('userData');
    this.token = localStorage.getItem('token');
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }
  
  handlerError(error: HttpErrorResponse) {
    return throwError(() => error);
  }

  getAccountData(id: number) {
    const userData = localStorage.getItem('userData');
    const token = userData ? JSON.parse(userData).token : null;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http
      .get(`${environment.baseURL}/account/${id}`, { headers })
      .pipe(catchError(this.handlerError));
  }

  getAccountDataFromLocalStorage() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      return JSON.parse(userData) as Account;
    } else {
      return null;
    }
  }

  updateAccountData(accountData: Account){
    const id =  accountData.userId;
    const dtype = localStorage.getItem('type');
    const userData = localStorage.getItem('userData');
    const token = userData ? JSON.parse(userData).token : null;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    if(dtype === 'Student'){
      return this.http.put<ApiResponse<Account>>(`${environment.baseURL}/auth/student/${id}`, accountData, { headers }).pipe(
        map((response) => {
          if (response.status === ApiResponseStatus.Success) {
            const user = response.data;
            localStorage.setItem('userData', JSON.stringify(user));
            return true;
          } else {
            console.error('Error en la solicitud HTTP:', response);
            return false;
          }
        }),
      );
    } else {
      return this.http.put<ApiResponse<Account>>(`${environment.baseURL}/auth/arrender/${id}`, accountData, { headers }).pipe(
        map((response) => {
          if (response.status === ApiResponseStatus.Success) {
            const user = response.data;
            localStorage.setItem('userData', JSON.stringify(user));
            return true;
          } else {
            console.error('Error en la solicitud HTTP:', response);
            return false;
          }
        }),
      );
    }
  }
}
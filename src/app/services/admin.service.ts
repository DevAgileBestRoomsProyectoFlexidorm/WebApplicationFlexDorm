import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Account } from '../models/account.model';
import { ApiResponse, ApiResponseStatus } from '../models/api-response.model';
import { Observable } from 'rxjs';
import { RoomData } from 'src/typings';
import { RoomModel } from '../models/room.model';
import { RentalData } from '../models/rental.models';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = environment.baseURL;

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

  private handleError(error: any): Observable<any> {
    console.error('Ocurrió un error:', error);
    return throwError(error);
  }

  getAccounts(): Observable<ApiResponse<Account[]>> {
    return this.http
      .get<ApiResponse<Account[]>>(`${this.baseUrl}/admin/getUsers`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  switchActivate(userId:any,status:boolean): Observable<ApiResponse<Account[]>>{
    return this.http
      .post<ApiResponse<Account[]>>(`${this.baseUrl}/admin/acUnAccount/${userId}/${status}`,Account ,{ headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  getRooms(): Observable<ApiResponse<RoomModel[]>> {
    return this.http
      .get<ApiResponse<RoomModel[]>>(`${this.baseUrl}/admin/getRooms`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  switchActivateRooms(roomId:any,status:boolean): Observable<ApiResponse<RoomModel[]>>{
    return this.http
      .post<ApiResponse<RoomModel[]>>(`${this.baseUrl}/admin/acUnRooms/${roomId}/${status}`,true ,{ headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  getRentas(): Observable<ApiResponse<RentalData[]>> {
    return this.http
      .get<ApiResponse<RentalData[]>>(`${this.baseUrl}/admin/getRental`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

}

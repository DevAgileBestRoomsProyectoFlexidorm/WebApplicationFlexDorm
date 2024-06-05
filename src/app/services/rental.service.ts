import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Subject, throwError, catchError, tap } from 'rxjs';
import { RentalData } from '../models/rental.models';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

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

  registerRental(rentalData: any): Observable<any> {
    const url = `${this.baseUrl}/rental/registerRental`;
    return this.http.post(url, rentalData, { headers: this.headers });
  }

  getRentByStudent(student: string): Observable<ApiResponse<RentalData[]>> {
    return this.http
      .get<ApiResponse<RentalData[]>>(`${this.baseUrl}/rental/getRentalsByStudentId/${student}`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  getMovimentByStudent(student: string): Observable<ApiResponse<RentalData[]>> {
    return this.http
      .get<ApiResponse<RentalData[]>>(`${this.baseUrl}/rental/getMovimentByStudentId/${student}`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  getRentByArrender(arrenderId: string): Observable<ApiResponse<RentalData[]>> {
    return this.http
      .get<ApiResponse<RentalData[]>>(`${this.baseUrl}/rental/getRentalsByArrenderId/${arrenderId}`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  getMovimentByArrender(arrenderId: string): Observable<ApiResponse<RentalData[]>> {
    return this.http
      .get<ApiResponse<RentalData[]>>(`${this.baseUrl}/rental/getMovimentByArrenderId/${arrenderId}`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  toggleFavorite(reservationId: string): Observable<ApiResponse<RentalData[]>> {
    const requestBody = {};
    return this.http.put<ApiResponse<RentalData[]>>(
      `${this.baseUrl}/rental/${reservationId}/toggleFavorite`,
      requestBody, { headers: this.headers }).pipe(
      catchError(this.handleError)
    );
  }

  toggleEndRent(reservationId: string): Observable<ApiResponse<RentalData[]>> {
    const requestBody = {};
    return this.http.put<ApiResponse<RentalData[]>>(
      `${this.baseUrl}/rental/${reservationId}/toggleEndRental`,
      requestBody, { headers: this.headers }).pipe(
      catchError(this.handleError)
    );
  }

  getRentByTrueStudent(student: string): Observable<ApiResponse<RentalData[]>> {
    return this.http
      .get<ApiResponse<RentalData[]>>(`${this.baseUrl}/rental/search/${student}`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

}

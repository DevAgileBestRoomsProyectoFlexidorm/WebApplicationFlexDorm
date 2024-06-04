import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Subject, throwError, catchError, tap } from 'rxjs';
import { RoomData } from 'src/typings';
import { RoomModel} from '../models/room.model';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  private userData;
  private token;
  private headers;

  constructor(private http: HttpClient) {
    this.userData = localStorage.getItem('userData');
    this.token = localStorage.getItem('token');
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  /**
   * Metodo que se encarga de manejar los errores
   */
  handlerError(error: HttpErrorResponse) {
    return throwError(() => error);
  }

  //observable que notificará la creación de habitaciones
  private roomCreatedSubject = new Subject<void>();
  //método para emitir una notificación de creación de un habitacion
  private onRoomCreated() {
    this.roomCreatedSubject.next();
  }
  //observable que los componentes pueden suscribirse para detectar la creación de una habitacion
  roomCreated$ = this.roomCreatedSubject.asObservable();

  /**
   * Obtiene la lista de habitaciones (GET)
   */
  getRoomsList(roomId: number | null) {
    return this.http
      .get<ApiResponse<RoomModel[]>>(`${environment.baseURL}/room/getRoomsByRoomId/${roomId}`, { headers: this.headers })
      .pipe(catchError(this.handlerError));
  }
  getRoomsListFree() {
    return this.http
      .get<ApiResponse<RoomModel[]>>(`${environment.baseURL}/room/getRoomsByStatusId/free`, { headers: this.headers })
      .pipe(catchError(this.handlerError));
  }

  getRoomsByArrender(arrender: string): Observable<ApiResponse<RoomModel[]>> {
    return this.http
      .get<ApiResponse<RoomModel[]>>(`${environment.baseURL}/room/getRoomsByArrenderId/${arrender}`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  getRoomsByArrenderRented(arrender: string): Observable<RoomData[]> {
    return this.http
      .get<RoomData[]>(`${environment.baseURL}/rooms?arrender=${arrender}&status=rented`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<any> {
    console.error('Ocurrió un error:', error);
    return throwError(error);
  }

  /**
   * Registra una nueva habitación (POST)
   * @param pelicula Datos de la habitación a registrar
   */
  registerRoom(roomData: RoomData) {
    console.log('nuevo room', roomData)
    return this.http.post(`${environment.baseURL}/room/registerRoom`, roomData, { headers: this.headers }).pipe(
      catchError(this.handlerError),
      tap(() => this.onRoomCreated()) //recupera la lista actualizada de habitaciones
    );
  }

  updateRoomStatus(roomId: number, status: string, student: string): Observable<any> {
    const url = `${environment.baseURL}/rooms/${roomId}`;
    const body = { status, student };
    return this.http.patch(url, body, { headers: this.headers });
  }

  getRoomsByStudentRented(student: string): Observable<RoomData[]> {
    return this.http
      .get<RoomData[]>(`${environment.baseURL}/rooms?student=${student}&status=rented`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }
}

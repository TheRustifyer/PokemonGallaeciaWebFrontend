import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersEndpoint: string = 'http://localhost:8080/api/users';
  private httpHeaders: HttpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(
    private http: HttpClient,
    private router: Router,
    ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersEndpoint);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.usersEndpoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/users']);
        console.error(e.error.message);
        Swal.fire('Ooops! Algo ha ido mal!', e.error.message, 'error');
        return throwError(e);
      })
    );
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.usersEndpoint, user, {headers: this.httpHeaders}).pipe(
      map( (response:any ) => response.user as User),
      catchError(e => {
        console.error(e.error.Mensaje);
        Swal.fire(e.error.message, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${this.usersEndpoint}/${user.id}`, user, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.Mensaje);
        Swal.fire(e.error.message, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<User> {
    return this.http.delete<User>(`${this.usersEndpoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.Mensaje);
        Swal.fire(e.error.message, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
}

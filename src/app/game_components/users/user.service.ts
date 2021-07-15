import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
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

  getUsers(page: number): Observable<any> {
    return this.http.get<User[]>(this.usersEndpoint + '/page/' + page).pipe(
      map((response: any) => {
        (response.content as User[]).map(user => {
          user.accountCreationDate = formatDate(user.accountCreationDate, 'dd-MM-yyyy', 'en-US');
          // Complete day -> 'EEEE dd-MMMM-yyyy'
          return user;
        });
        return response;
      })
    );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.usersEndpoint}/${id}`).pipe(
      catchError(e => {

        // Gonna check if there's some bad request backend's response
        if (e.status == 400) {
          return throwError(e);
        }

        // Redirects the client to the list of the users
        this.router.navigate(['/users']);
        // Output the errors inthe console, to make it easy to debug what went wrong
        console.error(e.error.message);
        // Shows the message through a sweetalert graphical modal
        Swal.fire('Ooops! Algo ha ido mal!', e.error.message, 'error');
        return throwError(e);
      })
    );
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.usersEndpoint, user, {headers: this.httpHeaders}).pipe(
      map( (response:any ) => response.user as User),
      catchError(e => {

        // Gonna check if there's some bad request backend's response
        if (e.status == 400) {
          return throwError(e);
        }

        console.error(e.error.message);
        Swal.fire(e.error.message, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${this.usersEndpoint}/${user.id}`, user, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.message);
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

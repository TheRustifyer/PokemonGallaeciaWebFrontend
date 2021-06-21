import { Injectable } from '@angular/core';
import { Trainer } from './trainer';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  private trainersEndpoint: string = 'http://localhost:8080/api/trainers';
  private httpHeaders: HttpHeaders = new HttpHeaders({'Content-type': 'application/json'});
  
  constructor(private http: HttpClient) { }

  getTrainers(): Observable<Trainer[]> {
    let response = this.http.get(this.trainersEndpoint).pipe(
      map( response => response as Trainer[] )
    );
    return response;
  }

  getTrainer(id: Number): Observable<Trainer> {
    return this.http.get<Trainer>(`${this.trainersEndpoint}/${id}`);
  }

  create(trainer: Trainer): Observable<Trainer> {
    return this.http.post<Trainer>(this.trainersEndpoint, trainer, {headers: this.httpHeaders});
  }

}

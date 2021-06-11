import { Injectable } from '@angular/core';
import { Trainer } from './trainer';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  private getTrainersEndpoint: string = 'http://localhost:8080/api/trainers';

  constructor(private http: HttpClient) { }

  getTrainers(): Observable<Trainer[]> {
    let response = this.http.get(this.getTrainersEndpoint).pipe(
      map( response => response as Trainer[] )
    );
    return response;
  }
}

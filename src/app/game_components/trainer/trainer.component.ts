import { Component, OnInit } from '@angular/core';
import { Trainer } from './trainer';
import { TrainerService } from './trainer.service';

@Component({
  selector: 'app-gamers',
  templateUrl: './trainers.component.html',
})
export class TrainersComponent implements OnInit {

  trainers: Trainer[] = [];

  constructor(private trainerService: TrainerService) { }

  ngOnInit(): void {
    this.trainerService.getTrainers().subscribe(
      trainers => this.trainers = trainers
    );
  }

}

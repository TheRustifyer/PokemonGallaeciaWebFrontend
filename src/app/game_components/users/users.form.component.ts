import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './user';
import { UserService } from './user.service';
import Swal from 'sweetalert2';
import { Trainer } from '../trainer/trainer';

@Component({
  selector: 'app-form',
  templateUrl: './users.form.component.html'
})
export class UsersFormComponent implements OnInit {

  user: User = new User();
  relatedTrainer: Trainer = new Trainer();

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.loadUser();
    this.user.trainer = {id: null, nickname: null, relatedUser: null};
  }
  
  public loadUser(): void {
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id'];
        if (id) {
          this.userService.getUser(id).subscribe(
            user => { this.user = user; this.relatedTrainer = this.user.trainer; }
          )
        }
      }
    )
  }

  public create(): void {
    this.userService.create(this.user).subscribe(
      user => { 
        this.router.navigate(['/users']);
        Swal.fire('Felicidades!', `Usuario ${user.username} ha registrado con éxito!`, 'success')
      }
    );
    console.log("USUARIO CREADO: " + this.user.trainer);
  }

  public update(): void {
    this.userService.update(this.user).subscribe(
      user => {
        console.log("Usuario actualizado: " + this.user);
        this.router.navigate(['/users']);
        Swal.fire('Usuario actualizado', `Usuario ${this.user.username} actualizado con éxito!`, 'success')
      }
    )
  
  }



}

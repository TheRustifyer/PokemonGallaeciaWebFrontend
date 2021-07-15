import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    
    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.userService.getUsers(page)
      .pipe(
        tap(response => {
          (response.content as User[]).forEach(user => {
            console.log(user.username)
          })
        })
      ).subscribe(response => this.users = response.content as User[]);
    })
  }

  delete(user: User): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Estás seguro?',
      text: `¿Seguro que deseas eliminar a ${user.username}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, estoy seguro!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete(user.id).subscribe(
          response => {
            this.users = this.users.filter(us => us !== user)
            swalWithBootstrapButtons.fire(
              'Acción completada!',
              `${user.username} ha sido eliminado del sistema`,
              'success'
            )
          }
        )
      } 
    })
  }

}

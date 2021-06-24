import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      users => this.users = users
    );
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

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ConfirmLoginDialog } from '../../shared/confirm-login-dialog/confirm-login-dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],  
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  form = {
    username: '',
    password: ''
  };

  cargando: boolean = false;           
  mensaje: string = '';                
  tipoMensaje: 'success' | 'error' | '' = ''; 

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  onSubmit(event: Event): void {
    event.preventDefault();
    this.cargando = true;
    this.mensaje = '';

    this.authService.login(this.form).subscribe({
      next: res => {
        this.cargando = false;
        if (res && res.token) {
          this.tipoMensaje = 'success';
          this.mensaje = 'Inicio de sesión exitoso';
          const dialogRef = this.dialog.open(ConfirmLoginDialog, {
            width: '300px',
            data: { message: '¿Inicio de sesión exitoso?' }
          });
          dialogRef.afterClosed().subscribe(() => {
            this.router.navigate(['/dashboard-admin']);
          });
        } else {
          this.tipoMensaje = 'error';
          this.mensaje = 'No se recibió token';
        }
      },
      error: err => {
        this.cargando = false;
        this.tipoMensaje = 'error';
        this.mensaje = 'Usuario o contraseña incorrectos';
        console.error('Login failed', err);
      }
    });
  }
}
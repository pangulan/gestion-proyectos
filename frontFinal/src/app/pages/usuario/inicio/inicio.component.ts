import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

interface Credenciales {
  username: string;
  password: string;
}

interface ResponseUser {
  nombre: string;
  // Otros campos necesarios
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  loginForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  iniciarSesion(): void {
    if (this.loginForm.invalid) {
      this.mostrarErrores();
      return;
    }

    const credenciales: Credenciales = {
      username: this.username?.value,
      password: this.password?.value
    };

    this.isLoading = true;

    this.authService.login(credenciales).subscribe({
      next: (response: ResponseUser) => {
        this.isLoading = false;
        this.authService.setUser(response);
        this.toastr.success(`Bienvenido, ${response.nombre}`, '¡Login Exitoso!');
        this.router.navigate(['/home']);
      },
      error: (error) => this.manejarError(error)
    });
  }

  private mostrarErrores(): void {
    if (this.username?.errors?.['required']) {
      this.toastr.error('El nombre de usuario es obligatorio.', '¡ERROR!');
    }

    if (this.password?.errors?.['required']) {
      this.toastr.error('La contraseña es obligatoria.', '¡ERROR!');
    } else if (this.password?.errors?.['minlength']) {
      this.toastr.error('La contraseña debe tener al menos 6 caracteres.', '¡ERROR!');
    }
  }

  private manejarError(error: any): void {
    this.isLoading = false;
    let mensaje = 'Hubo un error al iniciar sesión. Intenta más tarde.';
    if (error.status === 401) {
      mensaje = 'Credenciales incorrectas. Por favor, intenta nuevamente.';
    } else if (error.status === 403) {
      mensaje = 'Acceso prohibido. Tu cuenta puede estar desactivada.';
    }
    this.toastr.error(mensaje, '¡ERROR!');
  }
}

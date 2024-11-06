import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

interface Credenciales {
  correo: string;
  contrasena: string;
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
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  get correo() {
    return this.loginForm.get('correo');
  }

  get contrasena() {
    return this.loginForm.get('contrasena');
  }

  iniciarSesion(): void {
    if (this.loginForm.invalid) {
      this.mostrarErrores();
      return;
    }

    const credenciales: Credenciales = {
      correo: this.correo?.value,
      contrasena: this.contrasena?.value
    };

    this.isLoading = true;

    this.authService.login(credenciales).subscribe(
      (response: ResponseUser) => {
        this.isLoading = false;
        this.authService.setUser(response);
        this.toastr.success(`Bienvenido, ${response.nombre}`, '¡Login Exitoso!');
        this.router.navigate(['/home']);
      },
      (error) => this.manejarError(error)
    );
  }

  private mostrarErrores(): void {
    if (this.correo?.errors?.['required']) {
      this.toastr.error('El correo es obligatorio.', '¡ERROR!');
    } else if (this.correo?.errors?.['email']) {
      this.toastr.error('Por favor, introduce un correo válido.', '¡ERROR!');
    }

    if (this.contrasena?.errors?.['required']) {
      this.toastr.error('La contraseña es obligatoria.', '¡ERROR!');
    } else if (this.contrasena?.errors?.['minlength']) {
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

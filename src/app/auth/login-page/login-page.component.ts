import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Izitoast
import iziToast from 'izitoast';

// Service
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
})
export default class LoginPageComponent implements OnInit {

  fb = inject(FormBuilder);

  public user: any = {};
  public token: any = '';

  constructor(
    private _adminService: AdminService,
    private _router: Router
  ) {
    this.token = this._adminService.getToken();
  }
  ngOnInit(): void {
    console.log(this.token);

    if (this.token) {
      this._router.navigate(['/dashboard']);
    }
    else {
      // Mantener en el componente login
    }
  }

  loginForm = this.fb.group({
    input: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);

      const inputValue = this.loginForm.value.input!.trim();
      const password = this.loginForm.value.password;

      // Validamos si es email o DNI
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue);
      const isDNI = /^\d{8,}$/.test(inputValue);

      if (!isEmail && !isDNI) {
        iziToast.warning({
          title: 'Advertencia',
          message: 'Ingrese un correo válido o un DNI de 8 dígitos.',
          position: 'topRight',
        });
        return;
      }


      // Enviar como "username", ya sea correo o DNI
      const data = {
        username: inputValue,
        password: password,
      };

      this._adminService.login_Admin(data).subscribe({
        next: (response) => {
          console.log(response);
          iziToast.success({
            title: 'Exito',
            message: response.message || 'Inicio de sesión exitoso',
            position: 'topRight',
          });

          // Guardar token o redirigir si lo deseas
          localStorage.setItem('token', response.token);

          // Guardar todas las propiedades del usuario en localStorage
          // const user = response.user;
          // Object.entries(user).forEach(([key, value]) => {
          //   localStorage.setItem(key, value !== null ? String(value) : '');
          // });

          localStorage.setItem('user', JSON.stringify(response.user));

          // console.log('RESPONSE', response.user);

          this._router.navigate(['/dashboard']);

        },
        error: (error) => {
          console.error(error);
          const message = error?.error?.message || 'Error desconocido';

          iziToast.error({
            title: 'Error',
            message: message,
            position: 'topRight',
          });
        },
      });
    }
    else {
      iziToast.error({
        title: 'Error',
        class: 'text-danger',
        position: 'topRight',
        message: 'Por favor completa todos los campos correctamente',
      });
    }
  }

}

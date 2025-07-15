import { Component, inject, OnInit } from '@angular/core';
import { ModalUsuariosComponent } from "./modal-usuarios/modal-usuarios.component";
import { TableUsuariosComponent } from "./table-usuarios/table-usuarios.component";
import { SelectUsuariosComponent } from "./select-usuarios/select-usuarios.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from 'src/app/utils/form-utils';

// Servicios
import { SerenosService } from 'src/app/services/serenos.service';

// Notificaciones
import iziToast from 'izitoast';


interface Roles {
  rol: string;
}

@Component({
  selector: 'app-gestion-usuarios',
  imports: [ModalUsuariosComponent, TableUsuariosComponent, SelectUsuariosComponent, ReactiveFormsModule],
  templateUrl: './gestion-usuarios.component.html',
})
export default class GestionUsuariosComponent implements OnInit {

  // Variables
  fb = inject(FormBuilder);
  formUtils = FormUtils;

  public serenos: any[] = []; //  Lista que se enviará a table-usuarios

  // Constructor
  constructor(private _serenosService: SerenosService) {

    // onInit
  }
  ngOnInit(): void {
    this.obtenerSerenos();
  }

  // Roles
  roles: Roles[] = [
    { rol: 'sereno' },
    { rol: 'admin' },
  ];

  // FormUsers
  formUsers = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern(FormUtils.namePattern)]],
    lastName: ['', [Validators.required, Validators.pattern(FormUtils.lastNamePattern)]],
    dni: ['', Validators.compose([
      Validators.required,
      Validators.minLength(0),
      Validators.maxLength(8),
      Validators.pattern(FormUtils.dniPattern),
    ])],
    phone: ['', Validators.compose([
      Validators.required,
      Validators.pattern(FormUtils.phonePattern)
    ])],
    birthdate: ['', [Validators.required, FormUtils.isAdult(18)]],
    email: ['', [Validators.required, Validators.email, Validators.pattern(FormUtils.emailPattern)], [FormUtils.checkingServerResponse]],
    username: ['', [Validators.required, Validators.minLength(6), Validators.pattern(FormUtils.notOnlySpacesPattern), FormUtils.notStrider]],
    role: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  }
  );

  // =========================================================
  // 1.- REGISTRAR SERENOS
  // =========================================================
  onSubmit() {
    this.formUsers.markAllAsTouched();

    if (this.formUsers.invalid) {
      iziToast.error({
        title: 'Error',
        message: 'Por favor corrige los campos inválidos',
        position: 'topRight'
      });
      return;
    }

    const formData = this.formUsers.value;

    this._serenosService.createSereno(formData).subscribe({
      next: (res) => {
        iziToast.success({
          title: 'Éxito',
          message: 'Sereno registrado correctamente',
          position: 'topRight'
        });
        this.formUsers.reset();
      },
      error: (err) => {
        console.error('Error en el registro', err);
        const msg = err?.error?.error || 'Error en el servidor';
        iziToast.error({
          title: 'Error',
          message: msg,
          position: 'topRight'
        });
      }
    });
  }

  // =========================================================
  // 2.- OBTENER TODOS LOS SERENOS
  // =========================================================

  obtenerSerenos() {
    this._serenosService.getSerenos().subscribe({
      next: (res) => {
        this.serenos = res; // Guardar los serenos
        console.log("=========================")
        console.log("RESPONSE: ", this.serenos)
        console.log("=========================")
      },
      error: (err) => {
        console.error('Error al obtener serenos:', err);
      }
    });

  }

}

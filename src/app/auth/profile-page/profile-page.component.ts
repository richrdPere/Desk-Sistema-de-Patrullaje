import { Component, inject, OnInit } from '@angular/core';
import { AdminUser } from '../../interfaces/adminUser';
import { AdminService } from 'src/app/services/admin.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from 'src/app/utils/form-utils';
import { ViewChild, ElementRef } from '@angular/core';

// IziToast
import iziToast from 'izitoast';

@Component({
  selector: 'app-profile-page',
  imports: [],
  templateUrl: './profile-page.component.html',
})
export default class ProfilePageComponent implements OnInit {

  usuario!: AdminUser;
  usuarioEditable!: AdminUser; // copia temporal para editar
  archivoSeleccionado: File | null = null;
  avatar: string = ''; // URL actual del avatar

  @ViewChild('inputAvatar') inputAvatar!: ElementRef<HTMLInputElement>;

  // Variables - Formulario
  fb = inject(FormBuilder);
  formUtils = FormUtils;


  constructor(
    private _adminService: AdminService,
  ) { }
  ngOnInit(): void {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario() {
    const user = this._adminService.getUsuario();
    if (user) {
      this.usuario = user;
      this.usuarioEditable = { ...user }; // clonamos para editar sin afectar el original
    }
  }

  abrirModalEdicion() {
    this.usuarioEditable = { ...this.usuario }; // cada vez que se edita, refrescamos
    (document.getElementById('my_modal_4') as HTMLDialogElement).showModal();
  }

  guardarCambios() {
    // Aquí podrías enviar al backend si ya tienes endpoint de actualización
    console.log("===============================================")
    console.log("DATOS ACTUALIZADOS: ", this.usuarioEditable)
    console.log("===============================================")
    // this._adminService.actualizarUsuario(this.usuarioEditable).subscribe(
    //   (updated) => {
    //     this.usuario = updated;
    //     localStorage.setItem('user', JSON.stringify(updated));
    //     (document.getElementById('my_modal_4') as HTMLDialogElement).close();
    //   },
    //   (err) => {
    //     console.error('Error actualizando perfil', err);
    //   }
    // );
  }


  // ============================
  // Funciones Avatar
  // ============================
  abrirSelectorAvatar() {
    this.inputAvatar.nativeElement.click();
  }

  onAvatarSeleccionado(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.archivoSeleccionado = input.files[0];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatar = e.target.result; // Previsualización inmediata
      };
      reader.readAsDataURL(this.archivoSeleccionado);
    }
  }

  subirAvatar() {
    // if (!this.archivoSeleccionado) return;

    // const formData = new FormData();
    // formData.append('avatar', this.archivoSeleccionado);

    // this._adminService.subirAvatar(this.usuario.id, formData).subscribe((res) => {
    //   this.avatar = res.avatarUrl;
    //   this.usuario.avatar = res.avatarUrl;
    //   localStorage.setItem('user', JSON.stringify(this.usuario));
    // });
  }


}

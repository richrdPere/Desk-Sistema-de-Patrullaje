import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, } from '@angular/forms';

// Services
import { OperacionesService } from 'src/app/services/operaciones.service';

// Interfaces
import { Operaciones } from '../../../interfaces/operaciones';
import { FormUtils } from 'src/app/utils/form-utils';

// Notificaciones
import iziToast from 'izitoast';


@Component({
  selector: 'app-eventos-masivos-crud',
  imports: [ReactiveFormsModule],
  templateUrl: './eventos_masivos-crud.component.html',
})
export default class EventosMasivosCrudComponent implements OnInit {

  // Variables
  formUtils = FormUtils;
  fb = inject(FormBuilder);

  // Estados
  operacionForm!: FormGroup;
  operaciones: any[] = [];
  operacionSeleccionada: Operaciones | null = null;

  // Constructor
  constructor(
    private _operacionesService: OperacionesService
  ) { }


  ngOnInit(): void {
    this.operacionForm = this.fb.group({
      actividad: ['', Validators.required],
      descripcion: ['', Validators.required],
      lugar: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      nombreEntidad: ['', Validators.required],
    });

    this.obtenerOperaciones();
  }

  // =========================================================
  // 1.- OBTENER TODAS LOS OPERACIONES CONJUNTAS
  // =========================================================
  obtenerOperaciones() {
    this._operacionesService.obtenerOperaciones().subscribe({
      next: (res) => {
        this.operaciones = res; // Asegurar que sea un array
      },
      error: (err) => {
        console.error('Error al obtener las operaciones:', err);
        this.operaciones = [];
      }
    });
  }

  // =========================================================
  // 2.- REGISTRAR UNA OPERACION CONJUNTA
  // =========================================================
  guardarOperacion(): void {
    if (this.operacionForm.invalid) return;

    const data = this.operacionForm.value;

    if (this.operacionSeleccionada) {
      // Actualizar
      this._operacionesService.updateOperacion(this.operacionSeleccionada.id!, data).subscribe({
        next: () => {
          iziToast.success({
            title: 'Éxito',
            message: 'Operación actualizada correctamente',
            position: 'topRight'
          });
          this.cancelarEdicion();
          this.obtenerOperaciones();
        },
        error: () =>
          iziToast.error({
            title: 'Error',
            message: 'Error al actualizar operación',
            position: 'topRight'
          })
      });
    } else {
      // Crear
      this._operacionesService.crearOperacion(data).subscribe({
        next: () => {

          iziToast.success({
            title: 'Éxito',
            message: 'Operación registrada correctamente',
            position: 'topRight'
          });

          this.operacionForm.reset();
          this.obtenerOperaciones();
        },
        error: (err) => {
          console.error('Error al registrar operación', err);
          const msg = err?.error?.error || 'Error en el servidor';
          iziToast.error({
            title: 'Error al registrar el vehículo',
            message: msg,
            position: 'topRight'
          });
        }
      });
    }
  }

  // =========================================================
  // 3.- ACTUALIZAR OPERACION CONJUNTA
  // =========================================================
  // Seleccionar para editar
  seleccionarOperacion(op: Operaciones): void {
    this.operacionSeleccionada = op;
    this.operacionForm.patchValue(op);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Cancelar edición
  cancelarEdicion(): void {
    this.operacionSeleccionada = null;
    this.operacionForm.reset();
  }

  // Abrir modal
  abrirModalEditarVehiculo(operacion: Operaciones) {
    this.seleccionarOperacion(operacion); // Cargar datos en el formulario

    const modal: any = document.getElementById('my_modal_1');
    if (modal?.showModal) {
      modal.showModal();
    } else {
      console.error('No se pudo abrir el modal: asegúrate de usar <dialog id="my_modal_1">');
    }
  }

  // =========================================================
  // 4.- ELIMINAR OPERACION CONJUNTA
  // =========================================================
  eliminarOperacion(id: string): void {
    if (!confirm('¿Eliminar esta operación?')) return;

    this._operacionesService.deleteOperacionById(id).subscribe({
      next: () => {
        iziToast.success({
          title: 'Éxito',
          message: 'Operación eliminada',
          position: 'topRight'
        });

        this.obtenerOperaciones();
      },
      error: (err) => {
        console.error('Error al registrar operación', err);
        const msg = err?.error?.error || 'Error en el servidor';
        iziToast.error({
          title: 'Error al eliminar operación',
          message: msg,
          position: 'topRight'
        });
      }
    });
  }

}

import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, } from '@angular/forms';

// Services
import { VehiculosService } from 'src/app/services/vehiculos.service';

// Interface
import { Vehiculo } from 'src/app/interfaces/vehiculo';
import { FormUtils } from 'src/app/utils/form-utils';

// Notificaciones
import iziToast from 'izitoast';


@Component({
  selector: 'app-vehiculos-crud',
  imports: [ReactiveFormsModule],
  templateUrl: './vehiculos-crud.component.html',
})
export default class VehiculosCrudComponent implements OnInit {
  // Variables
  formUtils = FormUtils;
  fb = inject(FormBuilder);

  // Estados
  vehiculoForm!: FormGroup;
  vehiculos: any[] = [];
  vehiculoSeleccionado: Vehiculo | null = null;
  filtroForm!: FormGroup;

  // Constructor
  constructor(
    private _vehiculosService: VehiculosService
  ) { }

  ngOnInit(): void {
    this.vehiculoForm = this.fb.group({
      placa: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      anio: [0, [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      tipo: ['', Validators.required],
      estado: ['', Validators.required],
      uso: ['', Validators.required],
    });

    this.filtroForm = this.fb.group({
      tipo: [''],
      estado: [''],
      uso: ['']
    });

    this.obtenerVehiculos();
  }

  // =========================================================
  // 1.- OBTENER TODAS LOS VEHICULOS
  // =========================================================
  obtenerVehiculos() {
    this._vehiculosService.obtenerVehiculos().subscribe({
      next: (res) => {
        this.vehiculos = res; // Asegurar que sea un array
      },
      error: (err) => {
        console.error('Error al obtener vehiculos:', err);
        this.vehiculos = [];
      }
    });
  }

  // =========================================================
  // 2.- REGISTRAR NUEVO VEHICULO
  // =========================================================
  guardarVehiculo(): void {

    if (this.vehiculoForm.invalid) {
      iziToast.error({
        title: 'Error',
        message: 'Complete todos los campos requeridos.',
        position: 'topRight'
      });
      return;
    }

    const nuevoVehiculo: Vehiculo = this.vehiculoForm.value;

    if (this.vehiculoSeleccionado) {
      // Actualizar
      this._vehiculosService.updateVehiculo(this.vehiculoSeleccionado.id!, nuevoVehiculo).subscribe({
        next: () => {

          iziToast.success({
            title: 'Éxito',
            message: 'Vehículo actualizado correctamente',
            position: 'topRight'
          });

          this.vehiculoForm.reset();
          this.vehiculoSeleccionado = null;
          this.obtenerVehiculos();
        },
        error: () =>
          iziToast.error({
            title: 'Error',
            message: 'Error al actualizar vehículo',
            position: 'topRight'
          })
      });
    } else {
      // Crear
      this._vehiculosService.crearVehiculo(nuevoVehiculo).subscribe({
        next: (res) => {
          iziToast.success({
            title: 'Éxito',
            message: 'Vehículo registrado correctamente',
            position: 'topRight'
          });
          this.vehiculoForm.reset();

          // Cargar vehiculos
          this.obtenerVehiculos()
        },
        error: (err) => {
          console.error('Error en el registro', err);
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
  // 3.- ACTUALIZAR VEHICULO
  // =========================================================
  seleccionarVehiculo(vehiculo: Vehiculo) {
    this.vehiculoSeleccionado = vehiculo;
    this.vehiculoForm.patchValue(vehiculo);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  abrirModalEditarVehiculo(vehiculo: Vehiculo) {
    this.seleccionarVehiculo(vehiculo); // Cargar datos en el formulario

    const modal: any = document.getElementById('my_modal_1');
    if (modal?.showModal) {
      modal.showModal();
    } else {
      console.error('No se pudo abrir el modal: asegúrate de usar <dialog id="my_modal_1">');
    }
  }


  // =========================================================
  // 4.- ELIMINAR VEHICULO
  // =========================================================
  eliminarVehiculo(idVehiculo: string): void {
    if (confirm('¿Estás seguro de eliminar esta asignación?')) {
      this._vehiculosService.deleteVehiculoById(idVehiculo).subscribe({
        next: (res) => {
          console.log('Asignación eliminada:', res);
          this.obtenerVehiculos(); //  Vuelve a cargar la lista
        },
        error: (err) => {
          console.error('Error al eliminar la asignación:', err);
          alert('Ocurrió un error al eliminar la asignación.');
        }
      });
    }
  }

  // =========================================================
  // 5.- FILTRAR VEHICULO
  // =========================================================
  // Obtener todos sin filtro inicial
  obtenerTodosVehiculos() {
    this._vehiculosService.obtenerVehiculos().subscribe({
      next: (res) => (this.vehiculos = res),
      error: (err) => {
        console.error('Error en el registro', err);
        const msg = err?.error?.error || 'Error en el servidor';
        iziToast.error({
          title: 'Error al obtener vehículos',
          message: msg,
          position: 'topRight'
        });
      }
    });
  }
  // Función para filtrar
  filtrarVehiculos() {
    const filtros = this.filtroForm.value;

    this._vehiculosService.filtrarVehiculos(filtros).subscribe({
      next: (res) => {
        this.vehiculos = res;
        if (res.length === 0) {
          iziToast.success({
            title: 'Éxito',
            message: 'No se encontraron vehículos con ese filtro.',
            position: 'topRight'
          });
        }

      },

      error: (err) => {
        console.error('Error en el registro', err);
        const msg = err?.error?.error || 'Error al filtrar vehículos';
        iziToast.error({
          title: 'Error al obtener vehículos',
          message: msg,
          position: 'topRight'
        });
      }
    });
  }

  // Limpiar filtro
  limpiarFiltros() {
    this.filtroForm.reset();
    this.obtenerTodosVehiculos();
  }




}

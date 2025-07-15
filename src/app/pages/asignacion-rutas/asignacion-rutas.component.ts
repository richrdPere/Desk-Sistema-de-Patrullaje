import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';

// Interfaces
import { AsignarRuta } from './../../interfaces/asignarRuta';

// Services
import { AsignacionRutaService } from '../../services/asignacion-rutas.service';
import { SerenosService } from 'src/app/services/serenos.service';
import { ZonaService } from 'src/app/services/zona.service';

// Notificaciones
import iziToast from 'izitoast';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-zonas-asignadas',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './asignacion-rutas.component.html',
})
export default class ZonasPatrullajeseComponent implements OnInit {
  zonas: any[] = [];
  serenos: any[] = [];
  asignaciones: any[] = [];

  fechaMinima: string = this.getFechaHoy();
  asignacionForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _asignacionService: AsignacionRutaService,
    private _serenoService: SerenosService,
    private _zonaService: ZonaService
  ) { }

  ngOnInit(): void {
    this.asignacionForm = this.fb.group({
      zonaId: ['', Validators.required],
      serenos: [[], Validators.required],
      turno: ['', Validators.required],
      fecha: ['', Validators.required]
    });
    this._zonaService.obtenerZonas().subscribe(zonas => this.zonas = zonas);
    this._serenoService.getSerenos().subscribe(serenos => this.serenos = serenos);
    // this._asignacionService.obtenerAsignaciones().subscribe({
    //   next: (data) => this.asignaciones = data,
    //   error: (err) => console.error('Error al obtener asignaciones:', err)
    // });
    this.cargarAsignaciones();
  }

  getFechaHoy(): string {
    return new Date().toISOString().substring(0, 10); // YYYY-MM-DD
  }

  onCheckboxChange(event: any) {
    const selected = this.asignacionForm.get('serenos')?.value as string[];

    if (event.target.checked) {
      selected.push(event.target.value);
    } else {
      const index = selected.indexOf(event.target.value);
      if (index > -1) selected.splice(index, 1);
    }

    this.asignacionForm.get('serenos')?.setValue(selected);
  }

  asignarRuta(): void {
    if (this.asignacionForm.invalid) {
      iziToast.error({ title: 'Error', message: 'Complete todos los campos', position: 'topRight' });
      return;
    }

    const data: AsignarRuta = {
      ...this.asignacionForm.value,
      fecha: new Date(this.asignacionForm.value.fecha).toISOString().split('T')[0],
    };



    this._asignacionService.asignarRuta(data).subscribe({
      next: () => {
        iziToast.success({ title: 'Éxito', message: 'Ruta asignada correctamente', position: 'topRight' });
        this.asignacionForm.reset();
      },
      error: (error) => {
        console.error(error);
        iziToast.error({ title: 'Error', message: 'No se pudo asignar la ruta', position: 'topRight' });
      }
    });
  }

  getNombreSerenoById(idSereno: string): string {
    const sereno = this.serenos.find(s => s.id === idSereno);
    return sereno ? `${sereno.firstName} ${sereno.lastName}` : 'Desconocido';
  }

  getNombreZonaById(idZona: string): string {
    const zona = this.zonas.find(z => z.id === idZona);
    return zona ? zona.name : 'Zona no encontrada';
  }

  eliminarAsignacion(idAsignacion: string): void {
    if (confirm('¿Estás seguro de eliminar esta asignación?')) {
      this._asignacionService.eliminarAsignacion(idAsignacion).subscribe({
        next: (res) => {
          console.log('Asignación eliminada:', res);
          this.cargarAsignaciones(); //  Vuelve a cargar la lista
        },
        error: (err) => {
          console.error('Error al eliminar la asignación:', err);
          alert('Ocurrió un error al eliminar la asignación.');
        }
      });
    }
  }

  cargarAsignaciones(): void {
    this._asignacionService.obtenerAsignaciones().subscribe((data) => {
      this.asignaciones = data;
    });
  }

}

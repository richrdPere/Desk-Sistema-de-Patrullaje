import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Environment e Interfaces
import { environment } from '@environments/environment';
import { AsignarRuta } from '../interfaces/asignarRuta';


@Injectable({ providedIn: 'root' })
export class AsignacionRutaService {

  // 1.- Enviroment
  envs = environment;

  // 2.- variables publicas
  private url: string = this.envs.main_url;

  // 3.- Headers
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  constructor(private http: HttpClient) { }

  // ===========================================================
  // 1.- Asignar ruta al sereno
  // ===========================================================
  asignarRuta(asignacion: AsignarRuta): Observable<any> {
    return this.http.post(this.url + 'asignaciones', asignacion, { headers: this.getHeaders() });
  }

  // ===========================================================
  // 2.- Obtener asignacion del sereno
  // ===========================================================
  obtenerAsignaciones(): Observable<AsignarRuta[]> {
    return this.http.get<AsignarRuta[]>(this.url + 'asignaciones/asignaciones', { headers: this.getHeaders() });
  }

  // 3.  Obtener una asignación por su ID
  obtenerAsignacionPorId(id: string): Observable<AsignarRuta> {
    return this.http.get<AsignarRuta>(`${this.url}/${id}`);
  }

  // 4.  Actualizar asignación existente
  actualizarAsignacion(id: string, asignacion: Partial<AsignarRuta>): Observable<any> {
    return this.http.put(`${this.url}/${id}`, asignacion);
  }

  // ===========================================================
  // 5.  Eliminar una asignación
  // ===========================================================
  eliminarAsignacion(asignacionId: string): Observable<any> {
    return this.http.delete(`${this.url}asignaciones/${asignacionId}`, { headers: this.getHeaders() });
  }
}

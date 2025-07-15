import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//Environment
import { environment } from '@environments/environment';
import { Vehiculo } from '../interfaces/vehiculo';


@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  // 1.- Enviroment
  envs = environment;

  // 2.- variables publicas
  private url: string = this.envs.main_url;
  // private api = 'https://ba-sistemapatrullaje-backend.onrender.com/api/';

  // 3.- Headers
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  constructor(private http: HttpClient) {

  }

  // ===========================================================
  // 1.- Crear vehiculo
  // ===========================================================
  crearVehiculo(vehiculo: Vehiculo): Observable<any> {
    return this.http.post(`${this.url}vehiculos/`, vehiculo, { headers: this.getHeaders() });
  }

  // ===========================================================
  // 2.- Obtener vehiculos
  // ===========================================================
  obtenerVehiculos(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(`${this.url}vehiculos/vehiculos`, { headers: this.getHeaders() });
  }

  // ===========================================================
  // 3.- Obtener vehiculo por ID
  // ===========================================================
  getVehiculoById(id: string): Observable<any> {
    return this.http.get(`${this.url}vehiculos/${id}`, { headers: this.getHeaders() });
  }

  // ===========================================================
  // 4.- Eliminar vehiculo por ID
  // ===========================================================
  deleteVehiculoById(id: string): Observable<any> {
    return this.http.delete(`${this.url}vehiculos/${id}`, { headers: this.getHeaders() });
  }

  // ===========================================================
  // 5.- Actualizar vehículo por ID
  // ===========================================================
  updateVehiculo(id: string, vehiculo: Partial<Vehiculo>): Observable<any> {
    return this.http.put(`${this.url}vehiculos/${id}`, vehiculo, {
      headers: this.getHeaders()
    });
  }

  // ===========================================================
  // 6.- Filtrar vehículos por tipo, estado o uso
  // ===========================================================
  filtrarVehiculos(params: { tipo?: string, estado?: string, uso?: string }): Observable<Vehiculo[]> {
    let query = '';

    if (params.tipo) query += `tipo=${params.tipo}&`;
    if (params.estado) query += `estado=${params.estado}&`;
    if (params.uso) query += `uso=${params.uso}&`;

    // Quitar último "&" si existe
    if (query.endsWith('&')) query = query.slice(0, -1);

    return this.http.get<Vehiculo[]>(`${this.url}vehiculos/filter?${query}`, {
      headers: this.getHeaders()
    });
  }

}

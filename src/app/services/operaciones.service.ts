import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//Environment
import { environment } from '@environments/environment';
import { Operaciones } from '../interfaces/operaciones';

@Injectable({
  providedIn: 'root'
})
export class OperacionesService {

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

  constructor(private http: HttpClient) { }

  // ===========================================================
  // 1.- Crear Operacion Conjunta
  // ===========================================================
  crearOperacion(operacion: Operaciones): Observable<any> {
    return this.http.post(this.url + 'operaciones-conjuntas', operacion, { headers: this.getHeaders() });
  }

  // ===========================================================
  // 2.- Obtener Operaciones Conjunta
  // ===========================================================
  obtenerOperaciones(): Observable<Operaciones[]> {
    return this.http.get<Operaciones[]>(`${this.url}operaciones-conjuntas/operaciones-conjuntas`, { headers: this.getHeaders() });
  }

  // ===========================================================
  // 3.- Obtener Operaciones Conjunta por ID
  // ===========================================================
  getOperacionesById(id: string): Observable<any> {
    return this.http.get(`${this.url}operaciones-conjuntas/${id}`, { headers: this.getHeaders() });
  }


  // ===========================================================
  // 4.- Eliminar Operaciones Conjunta por ID
  // ===========================================================
  deleteOperacionById(id: string): Observable<any> {
    return this.http.delete(`${this.url}operaciones-conjuntas/${id}`, { headers: this.getHeaders() });
  }

  // ===========================================================
  // 5.- Actualizar Operaciones Conjunta por ID
  // ===========================================================
  updateOperacion(id: string, operacion: Partial<Operaciones>): Observable<any> {
    return this.http.put(`${this.url}operaciones-conjuntas/${id}`, operacion, {
      headers: this.getHeaders()
    });
  }

  // ============================================================
  // 6. Filtrar por fecha y entidad
  // ============================================================
  // filtrarOperaciones(params: { fecha?: string; entidad?: string }): Observable<Operaciones[]> {
  //   let query = '';

  //   if (params.fecha) query += `fecha=${params.fecha}&`;
  //   if (params.entidad) query += `entidad=${params.entidad}&`;

  //   if (query.endsWith('&')) query = query.slice(0, -1);

  //   return this.http.get<Operaciones[]>(`${this.url}operaciones/filter?${query}`, {
  //     headers: this.getHeaders()
  //   });
  // }
}

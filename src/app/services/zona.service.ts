import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//Environment
import { environment } from '@environments/environment';
import { ZonaPatrullaje } from './../interfaces/zonaPatrullaje';

@Injectable({ providedIn: 'root' })
export class ZonaService {

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
  // 1.- Crear Zona
  // ===========================================================
  crearZona(zona: ZonaPatrullaje): Observable<any> {


    return this.http.post(this.url + 'zonas', zona, { headers: this.getHeaders() });
  }

  // ===========================================================
  // 2.- Obtener zonas
  // ===========================================================
  obtenerZonas(): Observable<ZonaPatrullaje[]> {
    return this.http.get<ZonaPatrullaje[]>(this.url + 'zonas/zonas', { headers: this.getHeaders() });
  }

  // ===========================================================
  // 3.- Obtener zona por ID
  // ===========================================================
  getZonaById(id: string): Observable<any> {
    return this.http.get(`${this.url}zonas/${id}`, { headers: this.getHeaders() });
  }


  // ===========================================================
  // 4.- Eliminar zona por ID
  // ===========================================================
  deleteZonaById(id: string): Observable<any> {
    return this.http.delete(`${this.url}zonas/${id}`, { headers: this.getHeaders() });
  }
}

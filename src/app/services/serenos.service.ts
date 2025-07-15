import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

// Enviroment
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SerenosService {

  // 1.- Enviroment
  envs = environment;

  // 2.- variables publicas
  private baseUrl = this.envs.main_url + 'sereno/';

  // 3.- Headers
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  constructor(private _http: HttpClient) { }

  // ===========================================================
  // 1.- Listar todos los serenos
  // ===========================================================
  getSerenos(): Observable<any> {
    return this._http.get(`${this.baseUrl}serenos`, { headers: this.getHeaders() });
  }

  // ===========================================================
  // 2.- Obtener sereno por ID
  // ===========================================================
  getSerenoById(id: string): Observable<any> {
    return this._http.get(`${this.baseUrl}${id}`, { headers: this.getHeaders() });
  }

  // ===========================================================
  // 3.- Registrar un nuevo sereno
  // ===========================================================
  createSereno(data: any): Observable<any> {
    return this._http.post(`${this.baseUrl}registro_sereno`, data, { headers: this.getHeaders() });
  }

  // ===========================================================
  // 4.- Actualizar sereno
  // ===========================================================
  updateSereno(id: string, data: any): Observable<any> {
    return this._http.put(`${this.baseUrl}${id}`, data, { headers: this.getHeaders() });
  }

  // ===========================================================
  // 4.- Eliminar sereno
  // ===========================================================
  deleteSereno(id: string): Observable<any> {
    return this._http.delete(`${this.baseUrl}${id}`, { headers: this.getHeaders() });
  }


}

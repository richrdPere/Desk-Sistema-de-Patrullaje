import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Environment e Interfaces
import { environment } from '@environments/environment';
import { Incident } from '../interfaces/incident';


@Injectable({
  providedIn: 'root'
})
export class IncidentsService {

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

  getAllIncidents(): Observable<any[]> {
    return this.http.get<any>(`${this.url}incidentes`, { headers: this.getHeaders() });
  }

  getIncidentById(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}incidentes/${id}`);
  }

  filterIncidents(params: any): Observable<any[]> {
    let queryParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key]) queryParams = queryParams.set(key, params[key]);
    });

    return this.http.get<any[]>(`${this.url}incidentes/filtrar`, { params: queryParams });
  }

}

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

// Services
import { IncidentsService } from 'src/app/services/incidents.service';

@Component({
  selector: 'app-reportes',
  imports: [DatePipe],
  templateUrl: './reportes.component.html',
})
export default class ReportesComponent implements OnInit {

  incidents: any[] = [];
  loading = false;

  constructor(private _incidentService: IncidentsService) { }

  ngOnInit(): void {
    this.fetchIncidents();
  }

  fetchIncidents() {
    this.loading = true;
    this._incidentService.getAllIncidents().subscribe({
      next: (data) => {
        this.incidents = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al obtener incidentes:', err);
        this.loading = false;
      }
    });
  }
}

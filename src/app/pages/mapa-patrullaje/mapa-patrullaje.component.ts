
import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Lugar } from 'src/app/interfaces/lugar';

// Services
import { GoogleMapsLoaderService } from 'src/app/services/google-maps-loader.service';

@Component({
  selector: 'app-mapa-patrullaje',
  imports: [],
  templateUrl: './mapa-patrullaje.component.html',
})
export default class MapaPatrullajeComponent implements AfterViewInit {

  @ViewChild('map') mapaElement!: ElementRef;
  map!: google.maps.Map;

  marcadores: google.maps.Marker[] = [];
  infoWindows: google.maps.InfoWindow[] = [];

  mapaCargado = false;

  lugares: Lugar[] = [
    {
      nombre: 'Unsaac',
      lat: -13.52189,
      lng: -71.95828
    },
    {
      nombre: 'Ex PRONAA',
      lat: -13.53109,
      lng: -71.94069
    },
    {
      nombre: 'Gobierno Regional Cusco',
      lat: -13.52493,
      lng: -71.96274
    }
  ];

  constructor(private mapsLoader: GoogleMapsLoaderService) {
    // this.mapsLoader.load(); // precarga silenciosa

  }

  // async ngOnInit() {
  //   await this.mapsLoader.load();
  //   this.cargarMapa();
  // }

  async ngAfterViewInit() {
    await this.mapsLoader.load();
    this.cargarMapa();
    this.mapaCargado = true;
  }

  cargarMapa() {
    const latLng = new google.maps.LatLng(-13.540348, -71.982898);

    const mapaOpciones: google.maps.MapOptions = {
      center: latLng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapaElement?.nativeElement, mapaOpciones);

    for (const lugar of this.lugares) {
      this.agregarMarcador(lugar);
    }
  }

  agregarMarcador(marcador: Lugar) {

    const latLng = new google.maps.LatLng(marcador.lat, marcador.lng);

    const marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      draggable: true
    });

    this.marcadores.push(marker);

    const contenido = `<b>${marcador.nombre}</b>`;
    const infoWindow = new google.maps.InfoWindow({
      content: contenido
    });

    this.infoWindows.push(infoWindow);


    // Mostrar el info window
    google.maps.event.addDomListener(marker, 'click', () => {
      this.infoWindows.forEach(infoW => infoW.close());
      infoWindow.open(this.map, marker);
    });

    // Disparar un evento de socket, para borrar el marcador
    google.maps.event.addDomListener(marker, 'dblclick', () => {
      marker.setMap(null);
    });

    // Disparar un evento de socket, para mover el marcador
    // google.maps.event.addDomListener(marker, 'drag', (coors: { "": any; }) => {
    //   const nuevoMarcador = {
    //     lat: coors.LatLng.lat(),
    //     lng: coors.LatLng.lng(),
    //     nombre: marcador.nombre
    //   }
    // });
  }

}








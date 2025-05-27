import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsLoaderService {
  envs = environment;

  private apiKey: string = this.envs.googleMapsAPI;
  private mapsLoaded = false;
  private mapsLoading: Promise<void> | null = null;

  load(): Promise<void> {
    if (this.mapsLoaded) {
      return Promise.resolve();
    }

    if (this.mapsLoading) {
      return this.mapsLoading;
    }

    this.mapsLoading = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}`;
      script.defer = true;
      script.async = true;

      script.onload = () => {
        this.mapsLoaded = true;
        resolve();
      };

      script.onerror = (err) => reject(err);
      document.head.appendChild(script);
    });

    return this.mapsLoading;
  }

}

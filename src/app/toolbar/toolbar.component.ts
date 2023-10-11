import { Component, OnInit } from '@angular/core';
import { MapServiceService } from '../shared/services/map-service.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  title: string =
    'Angular viewer with "ArcGIS Maps SDK for JavaScript" components';
  mapText: string = 'layercount';
  layerCount: string = '';

  constructor(private mapService: MapServiceService) {}

  ngOnInit(): void {
    this.mapService.mapChangedEvent.pipe(tap(()=>{
      this.layerCount = this.mapService.GetLayerCount().toString();
    })).subscribe();
  }
}

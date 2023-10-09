import { Component, OnInit, ViewChild } from '@angular/core';
import { MapServiceService } from '../shared/services/map-service.service';
import MapView from '@arcgis/core/views/MapView';

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
    this.mapService.mapViewEvent.subscribe((mapview: MapView) => {
      this.layerCount = this.mapService.GetLayerCount().toString();
    });
  }
}

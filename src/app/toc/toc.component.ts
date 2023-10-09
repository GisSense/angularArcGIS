import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Renderer2,
} from '@angular/core';
import MapView from '@arcgis/core/views/MapView';
import { MapServiceService } from '../shared/services/map-service.service';

@Component({
  selector: 'app-toc',
  templateUrl: './toc.component.html',
  styleUrls: ['./toc.component.scss'],
})
export class TocComponent implements OnInit {
  @ViewChild('tocNode', { static: true }) mapViewEl!: ElementRef;

  constructor(
    private mapService: MapServiceService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.mapService.mapViewEvent.subscribe((mapview: MapView) => {
      // empty container
      this.renderer.setProperty(this.mapViewEl.nativeElement, 'innerHTML', '');
      //fill container with new layerlist
      this.mapService.FillLayerList(this.mapViewEl.nativeElement, mapview);
    });
  }
}

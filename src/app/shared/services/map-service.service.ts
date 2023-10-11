import { EventEmitter, Injectable, Output, Renderer2 } from '@angular/core';
import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';
import LayerList from '@arcgis/core/widgets/LayerList';

@Injectable({
  providedIn: 'root',
})
export class MapServiceService {
  public mapView: MapView = new MapView();
  public layerList: LayerList = new LayerList();
  public container: any;

  @Output()
  mapViewEvent = new EventEmitter<MapView>();

  @Output()
  mapChangedEvent = new EventEmitter<MapView>();

  constructor() {}

  MapViewChanged(mapView: MapView) {
    this.mapView = mapView;
    this.container = this.mapView.container;
    this.mapViewEvent.emit(this.mapView);
    this.mapChangedEvent.emit(this.mapView);
  }

  ChangeWebMap(portalItemId: string) {
    let webmap = new WebMap({
      portalItem: {
        id: portalItemId,
      },
    });
    this.mapView.map = webmap;
    
    webmap.when(()=>{
      this.mapChangedEvent.emit(this.mapView);
    });
  }

  GetLayerCount(): number {
    return this.mapView.map.layers.length;
  }

  FillLayerList(nativeElement: any, mapView: MapView): void {
    this.layerList = new LayerList({
      container: nativeElement,
      view: mapView,
      listItemCreatedFunction: (event) => {
        const item = event.item;
        if (item.layer.type != 'group') {
          item.panel = {
            content: 'legend',
            open: true,
          };
        }
      },
    });
  }
}

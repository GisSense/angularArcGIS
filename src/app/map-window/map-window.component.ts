import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';
import { MapServiceService } from '../shared/services/map-service.service';

@Component({
  selector: 'app-map-window',
  templateUrl: './map-window.component.html',
  styleUrls: ['./map-window.component.scss'],
})
export class MapWindowComponent implements OnInit, OnDestroy {
  @ViewChild('mapViewNode', { static: true }) mapViewEl!: ElementRef;
  public view: any = null;
  public mapcontextmenu: HTMLElement = document.createElement('div');

  constructor(private mapService: MapServiceService) {
    this.mapcontextmenu.style.backgroundColor = 'white';
    this.mapcontextmenu.style.padding = '2px';
  }

  initializeMap(): Promise<any> {
    const container = this.mapViewEl.nativeElement;
    //0097c633fb7f421aad7053f55060fa9c liander open data elektra net
    //e1615c81f617408a881013a2bcfe51e0 liander open data gas net
    const webmap = new WebMap({
      portalItem: {
        id: '0097c633fb7f421aad7053f55060fa9c',
      },
    });

    const view = new MapView({
      container,
      map: webmap,
    });

    // const bookmarks = new Bookmarks({
    //   view,
    //   editingEnabled: true,
    // });

    // const bkExpand = new Expand({
    //   view,
    //   content: bookmarks,
    //   expanded: false,
    // });

    // // Add the widget to the top-right corner of the view
    // view.ui.add(bkExpand, 'top-right');

    view.on('click', (event) => {
      view.closePopup();
      view.ui.remove(this.mapcontextmenu);

      if (event.button == 2) {
        view.popupEnabled = false;
        view.ui.remove(this.mapcontextmenu);
        this.restyleMapContextMenu(event);

        //Add an angular component to map
        //-------------------------------
        // let switchbutton: any =
        //   document.getElementsByTagName('app-switch-map')[0];
        // switchbutton.style.top = (event as any).screenPoint.y + 'px';
        // switchbutton.style.left = (event as any).screenPoint.x + 'px';
        // view.ui.add(switchbutton, 'manual');

        view.ui.add(this.mapcontextmenu, 'manual');

        console.log(
          'screenpoint: ' +
            this.mapcontextmenu.style.top +
            ' ; ' +
            this.mapcontextmenu.style.left
        );
        console.log('map point', event.mapPoint);
        view.popupEnabled = true;
      }
    });

    // bonus - how many bookmarks in the webmap?
    view.when(() => {
      if (webmap.bookmarks && webmap.bookmarks.length) {
        console.log('Bookmarks: ', webmap.bookmarks.length);
      } else {
        console.log('No bookmarks in this webmap.');
      }
    });

    this.view = view;
    return this.view.when();
  }

  ngOnInit(): void {
    this.initializeMap().then(() => {
      console.log('The map is ready.');
      this.mapService.MapViewChanged(this.view);
    });
  }

  ngOnDestroy(): void {
    if (this.view) {
      this.view.destroy();
    }
  }

  restyleMapContextMenu(event: any) {
    let xcoord = Math.round(event.mapPoint.x * 1000) / 1000;
    let ycoord = Math.round(event.mapPoint.y * 1000) / 1000;
    this.mapcontextmenu.innerHTML = xcoord + ', ' + ycoord;
    this.mapcontextmenu.style.top = (event as any).screenPoint.y + 'px';
    this.mapcontextmenu.style.left = (event as any).screenPoint.x + 'px';
  }
}

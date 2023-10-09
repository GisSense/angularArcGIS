import { Component, OnInit } from '@angular/core';
import { MapServiceService } from '../shared/services/map-service.service';

@Component({
  selector: 'app-switch-map',
  templateUrl: './switch-map.component.html',
  styleUrls: ['./switch-map.component.scss'],
})
export class SwitchMapComponent implements OnInit {
  private portalItemId: string = '0097c633fb7f421aad7053f55060fa9c';

  constructor(private mapService: MapServiceService) {}

  ngOnInit(): void {}

  onClick() {
    if (this.portalItemId == 'e1615c81f617408a881013a2bcfe51e0') {
      this.portalItemId = '0097c633fb7f421aad7053f55060fa9c';
    } else {
      this.portalItemId = 'e1615c81f617408a881013a2bcfe51e0';
    }
    this.mapService.ChangeWebMap(this.portalItemId);
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MapWindowComponent } from './map-window/map-window.component';
import { TocComponent } from './toc/toc.component';
import { SwitchMapComponent } from './switch-map/switch-map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    MapWindowComponent,
    TocComponent,
    SwitchMapComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, MatButtonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

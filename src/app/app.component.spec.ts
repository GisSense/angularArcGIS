import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

describe('AppComponent', () => {
  const createComponent = createComponentFactory({
    component: AppComponent,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  });

  let spectator: Spectator<AppComponent>;

  beforeEach(() => (spectator = createComponent()));

  it('should create the app', () => {
    const app = spectator.component;
    expect(app).toBeTruthy();
  });
});

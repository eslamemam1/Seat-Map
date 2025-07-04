import { Routes } from '@angular/router';
import { SeatMap } from './seat-map/seat-map';
import { Home } from './home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'seat-map',
    component: SeatMap,
  },
];

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-seat-map',
  standalone: true,
  templateUrl: './seat-map.html',
  styleUrls: [],
  imports: [CommonModule],
})
export class SeatMap {
  rows = 5;
  cols = 8;

  seats: { status: 'available' | 'reserved' | 'selected' }[][] = [];

  constructor() {
    for (let i = 0; i < this.rows; i++) {
      const row = [];
      for (let j = 0; j < this.cols; j++) {
        row.push({
          status: 'available' as 'available' | 'reserved' | 'selected',
        });
      }
      this.seats.push(
        row as { status: 'available' | 'reserved' | 'selected' }[]
      );
    }
  }

  toggleSeat(rowIndex: number, colIndex: number) {
    const seat = this.seats[rowIndex][colIndex];
    if (seat.status === 'reserved') return;

    seat.status = seat.status === 'selected' ? 'available' : 'selected';
  }
}

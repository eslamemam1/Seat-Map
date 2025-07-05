import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-seat-map',
  standalone: true,
  templateUrl: './seat-map.html',
  imports: [CommonModule],
})
export class SeatMap {
  rows = 5;
  cols = 8;

  showToast = false;
  toastMessage = '';

  // Load data from localStorage or use default
  data = JSON.parse(localStorage.getItem('seatsData') || 'null') || [
    { row: 1, col: 1, status: 'reserved' },
    { row: 1, col: 2, status: 'available' },
    { row: 1, col: 3, status: 'available' },
    { row: 1, col: 4, status: 'reserved' },
    { row: 1, col: 5, status: 'available' },
    { row: 1, col: 6, status: 'available' },
    { row: 1, col: 7, status: 'available' },
    { row: 1, col: 8, status: 'available' },
    { row: 2, col: 1, status: 'reserved' },
    { row: 2, col: 2, status: 'available' },
    { row: 2, col: 3, status: 'available' },
    { row: 2, col: 4, status: 'reserved' },
    { row: 2, col: 5, status: 'available' },
    { row: 2, col: 6, status: 'reserved' },
    { row: 2, col: 7, status: 'available' },
    { row: 2, col: 8, status: 'available' },
  ];

  seats: ({ status: string } | null)[][] = [];

  constructor() {
    this.buildSeats();
  }

  buildSeats() {
    this.seats = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => null)
    );

    for (const s of this.data) {
      const i = s.row - 1;
      const j = s.col - 1;
      this.seats[i][j] = { status: s.status };
    }
  }

  toggle(i: number, j: number) {
    const seat = this.seats[i][j];
    if (!seat || seat.status === 'reserved') return;
    seat.status = seat.status === 'selected' ? 'available' : 'selected';
  }

  count(type: string) {
    return this.seats.flat().filter((s) => s?.status === type).length;
  }

  get selectedSeats() {
    return this.count('selected');
  }

  get availableSeats() {
    return this.count('available');
  }

  get reservedSeats() {
    return this.count('reserved');
  }

  confirm() {
    const selected: { row: number; col: number }[] = [];

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const seat = this.seats[i][j];
        if (seat?.status === 'selected') {
          seat.status = 'reserved';
          selected.push({ row: i + 1, col: j + 1 });

          const idx = this.data.findIndex(
            (s: { row: number; col: number; status: string }) =>
              s.row === i + 1 && s.col === j + 1
          );
          if (idx !== -1) this.data[idx].status = 'reserved';
          else this.data.push({ row: i + 1, col: j + 1, status: 'reserved' });
        }
      }
    }

    localStorage.setItem('seatsData', JSON.stringify(this.data));

    if (selected.length) {
      this.toastMessage = `Reserved:\n${selected
        .map((s) => `Row ${s.row}, Col ${s.col}`)
        .join(', ')}`;
      this.showToast = true;
      setTimeout(() => (this.showToast = false), 3000);
    }
  }

  reset() {
    localStorage.removeItem('seatsData');
    window.location.reload();
  }
}

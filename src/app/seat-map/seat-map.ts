import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Seat, SeatService } from './../services/seat';

@Component({
  selector: 'app-seat-map',
  standalone: true,
  templateUrl: './seat-map.html',
  imports: [CommonModule, HttpClientModule],
})
export class SeatMap implements OnInit {
  seats: Seat[] = [];
  rows = 5;
  cols = 8;

  constructor(private SeatService: SeatService) {}

  ngOnInit() {
    this.SeatService.getSeats().subscribe((data) => {
      this.seats = data;
      console.log('Seats loaded:', data);
    });
  }

  getSeat(row: number, col: number): Seat | undefined {
    return this.seats.find((s) => s.row === row && s.col === col);
  }

  toggle(seat: Seat) {
    if (seat.status === 'reserved') return;
    seat.status = seat.status === 'selected' ? 'available' : 'selected';
  }

  confirm() {
    const selectedSeats = this.seats.filter((s) => s.status === 'selected');
    selectedSeats.forEach((seat) => {
      seat.status = 'reserved';
      if (seat.id) {
        this.SeatService.updateSeat(seat.id, {
          status: 'reserved',
        }).subscribe();
      }
    });
  }

  reset() {
    this.seats.forEach((seat) => {
      if (seat.status === 'reserved') {
        seat.status = 'available';

        if (seat.id) {
          this.SeatService.updateSeat(seat.id, {
            status: 'available',
          }).subscribe();
        }
      }
    });
  }

  trackByIndex(index: number): number {
    return index;
  }
}

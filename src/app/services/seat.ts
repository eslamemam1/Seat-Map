import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// types of seat status
export type SeatStatus = 'available' | 'reserved' | 'selected';

// Seat interface representing a seat in the seat map
export interface Seat {
  id?: string;
  row: number;
  col: number;
  status: SeatStatus;
}

@Injectable({
  providedIn: 'root',
})
export class SeatService {
  private readonly apiUrl = 'https://68689889d5933161d70bf49d.mockapi.io/seats';

  constructor(private http: HttpClient) {}

  // git all seats
  getSeats(): Observable<Seat[]> {
    return this.http.get<Seat[]>(this.apiUrl);
  }

  // update a specific seat by id
  updateSeat(id: string, data: Partial<Seat>): Observable<Seat> {
    return this.http.put<Seat>(`${this.apiUrl}/${id}`, data);
  }
}

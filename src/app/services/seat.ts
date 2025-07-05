import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// أنواع الحالة لكل كرسي
export type SeatStatus = 'available' | 'reserved' | 'selected';

// تعريف الواجهة الخاصة بالكرسي
export interface Seat {
  id?: string; // mockapi.io عادة يستخدم string للـ id
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

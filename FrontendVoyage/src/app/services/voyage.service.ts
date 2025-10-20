import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoyageService {
  private baseUrl = 'http://localhost:3000'; // Adaptez selon votre port backend

  constructor(private http: HttpClient) { }

  // Correspond à POST /voyages
  createVoyage(voyage: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/voyages`, voyage);
  }


  // Correspond à GET /voyages
  getAllVoyages(): Observable<any> {
    return this.http.get(`${this.baseUrl}/voyages`);
  }

  // Correspond à DELETE /voyages/:id
  deleteVoyage(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/voyages/${id}`);
  }

  // Correspond à GET /voyages/:id
  getVoyage(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/voyages/${id}`);
  }

  // Correspond à PUT /voyages/:id
  updateVoyage(id: string, voyage: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/voyages/${id}`, voyage);
  }
}
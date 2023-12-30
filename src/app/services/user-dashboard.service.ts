import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDashboardService {

  constructor(private http: HttpClient) { }

  getFields(): Observable<any>{
    return this.http.get(`${environment.API_URL}/UserDashboard/getFields`)
  }

}

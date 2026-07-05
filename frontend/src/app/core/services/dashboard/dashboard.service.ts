import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { environment } from '../../../../environments/environment';
//import { environment } from '@environments/environment';
import { environment } from '../../../../environments/environment';


@Injectable({ providedIn: 'root'})
export class DashboardService {
    private _httpClient = inject(HttpClient);

    //private _baseUrl = '${environment.apiUrl}/dashboard';
    private _baseUrl = `${environment.apiUrl}/api/dashboard`;

    getDashboardData(): Observable<any> {
        return this._httpClient.get(`${this._baseUrl}/`);
    }

    updateDashboardData(data: any): Observable<any>{
        return this._httpClient.patch(`${this._baseUrl}/update/`, data);
    }

}
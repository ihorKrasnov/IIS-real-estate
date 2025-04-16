import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";


export abstract class BaseApiService {
    private apiUrl: string = 'https://localhost:7208/api/';

    abstract controllerName: string;

    constructor(private http: HttpClient) { }

    post<T>(action: string, data: any): Observable<T> {
        return this.http.post<T>(`${this.apiUrl}${this.controllerName}${action}`, data);
    }

    get<T>(action: string): Observable<T> {
        return this.http.get<T>(`${this.apiUrl}${this.controllerName}${action}`);
    }
    
    put<T>(action: string, data: any): Observable<T> {
        return this.http.put<T>(`${this.apiUrl}${this.controllerName}${action}`, data);
    }

    delete<T>(action: string): Observable<T> {
        return this.http.delete<T>(`${this.apiUrl}${this.controllerName}${action}`);
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';

export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  clientType: number;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService extends BaseApiService {
  override controllerName: string = 'clients';

  constructor(http: HttpClient) {
    super(http);
  }

  getClients(): Observable<Client[]> {
    return this.get<Client[]>('');
  }

  getClient(id: number): Observable<Client> {
    return this.get<Client>(`/${id}`);
  }

  createClient(client: Client): Observable<Client> {
    return this.post<Client>('', client);
  }

  updateClient(client: Client): Observable<Client> {
    return this.put<Client>(`/${client.id}`, client);
  }

  deleteClient(id: number): Observable<void> {
    return this.delete<void>(`/${id}`);
  }
}

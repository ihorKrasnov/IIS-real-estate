import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../api-services/clients.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-client',
  standalone: true,
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    FormsModule
  ]
})
export class ClientCreateComponent implements OnInit {
  client: any = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    clientType: 0
  };
  isEditMode: boolean = false;

  constructor(
    private clientService: ClientService, 
    public router: Router,
    private route: ActivatedRoute 
  ) {}

  ngOnInit(): void {
    const clientId = this.route.snapshot.paramMap.get('id');
    if (clientId) {
      this.isEditMode = true;
      this.clientService.getClient(+clientId).subscribe((data) => {
        this.client = data;
      });
    }
  }

  saveClient(): void {
    if (this.isEditMode) {
      this.clientService.updateClient(this.client).subscribe(() => {
        this.router.navigate(['/clients']);
      });
    } else {
      this.clientService.createClient(this.client).subscribe(() => {
        this.router.navigate(['/clients']);
      });
    }
  }
}

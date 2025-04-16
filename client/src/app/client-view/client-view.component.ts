import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../api-services/clients.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-view-client',
  standalone: true,
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class ClientViewComponent implements OnInit {
  client: any;

  constructor(
    private clientService: ClientService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const clientId = +this.route.snapshot.paramMap.get('id')!;
    this.clientService.getClient(clientId).subscribe((data) => {
      this.client = data;
    });
  }

  editClient(id: number): void {
    this.router.navigate(['/create-client', id]);
  }
}

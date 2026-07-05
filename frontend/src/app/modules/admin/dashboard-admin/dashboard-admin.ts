import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '../../../core/services/dashboard/dashboard.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.css'
})
export class DashboardAdmin implements OnInit {
  private _dashboardService = inject(DashboardService);
  private _cdr = inject(ChangeDetectorRef);
  descripcionEdit: string = '';
  editar: boolean = false;
  dashboard: any = null;
  loading: boolean = true;
  imagenFile: File | null = null;
  
  ngOnInit(): void {
      this._dashboardService.getDashboardData().subscribe({
      next: res => {
        this.dashboard = res.data.dashboard;
        this.loading = false;
        this._cdr.detectChanges(); 
      },
      error: err => {
        console.error('Error fetching dashboard data', err);
        this.loading = false;
        this._cdr.detectChanges(); 
      }
    });
  }

  Editar(): void{
    this.descripcionEdit = this.dashboard?.descripcion || '';
    this.editar = true;
  }

  cancelarEdicion(): void {
    this.editar = false;
  }

  onImageSeleccionada(event: Event): void{
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]){
      this.imagenFile = input.files[0];
    }
  }

  guardarEdicion(): void {
    const formData = new FormData();
    formData.append('descripcion', this.descripcionEdit);

    if (this.imagenFile){
      formData.append('imagen', this.imagenFile);
    }

    this._dashboardService.updateDashboardData(formData).subscribe({
      next: res =>{
        this.dashboard = res.data.dashboard;
        this.editar = false;
        this._cdr.detectChanges();
        window.location.reload();
      },
      error: err => console.error("error al guardar", err)
    })
  }
}

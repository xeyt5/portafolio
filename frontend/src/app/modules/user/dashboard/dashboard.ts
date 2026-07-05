import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import  { RouterLink } from '@angular/router';
import { SafeUrlPipe } from '../../../pipes/safe-url-pipe';
import { url } from 'inspector';
import { DashboardService } from 'app/core/services/dashboard/dashboard.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, SafeUrlPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  private _dashboarService = inject(DashboardService)
  private _cdr = inject(ChangeDetectorRef)
  dashboard: any = null;
  loading: boolean = true;

  ngOnInit(): void{
    this._dashboarService.getDashboardData().subscribe({
      next: res => {
        this.dashboard = res.data.dashboard;
        this.loading = false
        this._cdr.detectChanges()
      },
      error: err => {
        this.loading = false;
        this._cdr.detectChanges()
      }
    })
  }


  videos = [
    {
      title: '¡Las 10 apps que no pueden faltar en tu Linux!',
      description: '¡Hola a todos! Bienvenidos a mi canal. Hoy les traigo un video súper interesante sobre 10 apps para linux!!!',
      url: 'https://www.youtube.com/embed/kEsILbeD13g'
    },
    {
      title: 'Lo que Windows NO te permite hacer (pero Linux sí)',
      description: 'Hola a todos! Bienvenidos a mi canal. Hoy les traigo un video súper interesante donde te muestro cosas que Windows no te permite hacer pero Linux sí!!!',
      url: 'https://www.youtube.com/embed/EaMvGe8Nqzs'
      
    },
    {
      title: '¡Mira cómo Hyperland cambia tu Linux!',
      description: '¡Hola a todos! Bienvenidos a mi canal. Hoy les traigo un video súper interesante sobre Hyperland, un gestor de ventanas para Linux que transformará tu experiencia visual!!!',
      url: 'https://www.youtube.com/embed/oC4aE2Qc5tE'
    }

  ];

  projects = [
    {
      title: 'Portafolio Personal',
      description: 'Mi portafolio personal construido con Angular, TailwindCSS y Django. Muestra mis proyectos, habilidades y experiencia de una manera visualmente atractiva para que se mas facil para todos observar.',
      image: 'cargando.avif',
      url: ''
    },
    {
      title: 'Blog de Tecnología',
      description: 'Un blog de tecnología donde comparto mis conocimientos sobre Linux, programación y desarrollo web. Construido con Angular y TailwindCSS para una experiencia de usuario fluida.',
      image: 'cargando.avif',
      url: ''
    },
    {
      title: 'Gestor de Tareas',
      description: 'Una aplicación de gestión de tareas que me ayuda a organizar mi trabajo diario. Desarrollada con Angular para el frontend y Django para el backend donde pueden agregar diferentes tareas.',
      image: 'cargando.avif',
      url: ''
    }
  ]  

}

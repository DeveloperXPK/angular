import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  template: `
    
    <button class='btn btn-primary' (click)='logout()'>Cerrar Sesion</button>
  `,
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    const token = sessionStorage.getItem('session_token'); // sessionStorage.getItem() obtiene el token almacenado en el navegador del usuario

    if (!token) {
      this.router.navigate(['/login']);
    }
  }


  public logout(): void {
    sessionStorage.removeItem('session_token'); // sessionStorage.removeItem() elimina el token almacenado en el navegador del usuario
    this.router.navigate(['/login']); // redirige al usuario a la pagina de login
  }
}

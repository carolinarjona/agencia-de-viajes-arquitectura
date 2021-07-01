import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() cerrarSesion = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // irAViajes():void {
  //   this.router.navigate(['']);
  // }

  // irAcrearViaje():void {
  //   this.router.navigate(['viajes/crear'])
  // }

  cerrarSesionClick() {
    if (confirm('¿Seguro que quieres cerrar la sesión?')) {
      this.cerrarSesion.emit();
    }
  }
}

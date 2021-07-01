import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'src/app/shared/modals/confirmation.service';
import { ClienteListItem } from '../models/cliente-list-item';
import { ClientesModelService } from '../services/clientes-model.service';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.scss']
})
export class ClientesListComponent implements OnInit {

  clientes: ClienteListItem[] = [];
  constructor(
    private clientesModel: ClientesModelService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.clientesModel.getAll().subscribe((data) => {
      this.clientes = data;
    });
  }

  editarClick(id: string): void {
    if (id) {
      this.clientesModel.getById(id).subscribe((cliente) => {
        if (cliente) {
          this.router.navigate(['clientes/editar', id]);
        }
      });
    }
  }

  borrarClick(id: string): void {
    if (id) {
      this.confirmationService.confirmar(
        {
          titulo: 'Eliminar cliente',
          pregunta: '¿Está seguro de querer eliminar este cliente?',
          opcionSi: 'Sí, eliminar',
          opcionNo: 'Cancelar'
        }).subscribe(x => {
          if (x) {
          this.clientesModel.delete(id).subscribe(() => {
            this.clientesModel.getAll().subscribe(result => {
              this.clientes = result
            })
          })
        }
      })
    }
  }


  // private cargarClientes() {
  //   this.clientesModel.getAll().subscribe((x) => {
  //     this.clientes = x;
  //   });
  // }

}

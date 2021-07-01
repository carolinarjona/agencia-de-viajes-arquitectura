import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ClientesEditComponent } from './clientes-edit/clientes-edit.component';
import { ClientesListComponent } from './clientes-list/clientes-list.component';
import { ClientesTableListComponent } from './clientes-list/clientes-table-list/clientes-table-list.component';
import { ClientesRoutingModule } from './clientes-routing.module';



@NgModule({
  declarations: [
    ClientesListComponent,
    ClientesTableListComponent,
    ClientesEditComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    SharedModule
  ]
})
export class ClientesModule { }

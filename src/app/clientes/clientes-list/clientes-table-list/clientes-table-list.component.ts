import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GridEvent } from 'src/app/viajes/models/grid-event';
import { ClienteListItem } from '../../models/cliente-list-item';

@Component({
  selector: 'app-clientes-table-list',
  templateUrl: './clientes-table-list.component.html',
  styleUrls: ['./clientes-table-list.component.scss']
})
export class ClientesTableListComponent implements OnInit, OnChanges {

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  dataSource = new MatTableDataSource<ClienteListItem>();

  @Input() clientes: ClienteListItem[] = [];
  @Output() editar = new EventEmitter<string>();
  @Output() borrar = new EventEmitter<string>();

  @Output() page = new EventEmitter<GridEvent>();

  displayedColumns: string [] = ['nombre', 'apellidos', 'dni', 'telefono', 'estadoCivilDesc', 'editar', 'borrar']

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.clientes){
      this.dataSource.data = [...changes.clientes.currentValue];
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
    this.dataSource.paginator = this.paginator;
    }
  }

}

import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GridEvent } from '../../models/grid-event';
import { Viaje } from '../../models/viaje';

@Component({
  selector: 'app-viajes-table-list',
  templateUrl: './viajes-table-list.component.html',
  styleUrls: ['./viajes-table-list.component.scss']
})
export class ViajesTableListComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  dataSource = new MatTableDataSource<Viaje>();

  @Input() viajes: Viaje[] = [];
  @Output() editar = new EventEmitter<string>();
  @Output() borrar = new EventEmitter<string>();

  @Output() page = new EventEmitter<GridEvent>();
  
displayedColumns: string [] = ['nombre', 'tipoDeViajeId', 'destino', 'duracion', 'plazas', 'precio', 'fechaSalida', 'enOferta', 'estado', 'editar', 'borrar']

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.viajes){
      this.dataSource.data = [...changes.viajes.currentValue];
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
    this.dataSource.paginator = this.paginator;
    }
  }

  // pageChanged(event: PageEvent) {
  //   if (event) {
  //     this.page.emit({
  //       page: event.pageIndex + 1,
  //       pageSize: event.pageSize
  //     })
  //   }
  // }

}

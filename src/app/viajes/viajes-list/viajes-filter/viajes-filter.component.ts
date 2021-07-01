import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ViajesFilter } from '../../models/viajes-filter';
import { IdValor } from '../../../models/id-valor';

@Component({
  selector: 'app-viajes-filter',
  templateUrl: './viajes-filter.component.html',
  styleUrls: ['./viajes-filter.component.scss']
})
export class ViajesFilterComponent implements OnInit {

  @Output() search = new EventEmitter<ViajesFilter>();
  @Input() tiposDeViaje: IdValor[] = [];

  filterForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.filterForm = fb.group({
      nombre: [''],
      tipoDeViajeId: [''],
      destino: [''],
    })
  }

  ngOnInit(): void {
  }

  searchClick(form: FormGroup) {
    this.search.emit(new ViajesFilter(form.value));
  }

  limpiarFiltro(): void {
    this.filterForm.reset();
    this.search.emit(new ViajesFilter());
  }

}


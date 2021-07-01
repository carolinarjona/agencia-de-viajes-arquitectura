import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { formatFecha } from 'src/app/core/utils/dates-helpers';
import { AlertService } from 'src/app/shared/alert-modal/alert.service';
import { Cliente } from '../models/cliente';
import { EstadoCivilTipo } from '../models/enums/estado-civil-enum';
import { EstadoCivil } from '../models/estadoCivil';
import { ClientesModelService } from '../services/clientes-model.service';
import { EstadosCivilesModelService } from '../services/estadoCivil-model.service';

@Component({
  selector: 'app-clientes-edit',
  templateUrl: './clientes-edit.component.html',
  styleUrls: ['./clientes-edit.component.scss']
})
export class ClientesEditComponent implements OnInit {

  id: string = '';

  cliente: Cliente | null = null;
  estadosCiviles: EstadoCivil[] = [];

  clientesForm: FormGroup;
  submited = false;

  constructor(
    private router: Router,
    route: ActivatedRoute,
    fb: FormBuilder,
    private clientesModel: ClientesModelService,
    private estadosCivilesModel: EstadosCivilesModelService,
    private alertService: AlertService
  ) {
    route.params.subscribe((params) => {
      this.id = params.id || '';
    });

    this.clientesForm = fb.group({
      id: [''],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      dni: ['', Validators.required],
      telefono: [null],
      fechaDeNacimiento: [null],
      estadoCivilId: [EstadoCivilTipo.desconocido],
    });
  }

  ngOnInit(): void {
    this.estadosCivilesModel.getAll().subscribe(x => {
      this.estadosCiviles = x.filter(e => e.id !== EstadoCivilTipo.desconocido);
      // this.estadosCiviles = x.map(e => {
        // if (e.id === EstadoCivilTipo.desconocido) {
        //   return {
        //     ...e, valor: ""
        //   }
        // }
      // })
    });

    if (this.id) {
      this.clientesModel.getById(this.id).subscribe(c => {
        if (c) {
          this.clientesForm.patchValue(c);
          if (c?.fechaDeNacimiento) {
            const formatdate = formatFecha(c?.fechaDeNacimiento);
            this.clientesForm.controls.fechaDeNacimiento.setValue(formatdate);
          }
        }
      });
    }
  }

  guardarClick(form: FormGroup): void {
    this.submited = true;
    if (form.valid) {
      const cliente: Cliente = new Cliente(form.value);
      if (form.value.fechaDeNacimiento) {
        cliente.fechaDeNacimiento = new Date(form.value.fechaDeNacimiento);
      }
      this.clientesModel.save(cliente).subscribe(() => {
        this.alertService.aceptar({
          contenido: 'Has editado a este cliente',
          aceptar: 'Aceptar'
        })
        this.router.navigate(['clientes']);
      });
    }
  }
  
  resetForm() {
    this.submited = false;
    this.clientesForm.reset();
  }

}

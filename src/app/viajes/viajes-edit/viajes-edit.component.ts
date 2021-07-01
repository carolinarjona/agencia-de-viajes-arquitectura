import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { formatFecha } from 'src/app/core/utils/dates-helpers';
import { TipoDeViaje } from '../models/enums/tipo-de-viaje-enum';
import { Viaje } from '../models/viaje';
import { IdValor } from '../../models/id-valor';
import { ViajesModelService } from '../services/viajes-model.service';
import { ToastMessagesService } from 'src/app/core/services/toast-messages.service';

@Component({
  selector: 'app-viajes-edit',
  templateUrl: './viajes-edit.component.html',
  styleUrls: ['./viajes-edit.component.scss']
})
export class ViajesEditComponent implements OnInit {

  viaje: Viaje | null = null;
  tiposDeViaje: IdValor[] = [];
  id: string = '';

  viajesForm: FormGroup;

  submited = false;

  constructor(fb: FormBuilder, private viajesModel: ViajesModelService,
    private route: ActivatedRoute, private router: Router, private toastMessage: ToastMessagesService) {

    route.params.subscribe(params => {
      this.id = params.id || ''
    });

    this.viajesForm = fb.group({
      id: [''],
      nombre: ['', Validators.required],
      tipoDeViajeId: ['', Validators.required],
      duracion: ['', [Validators.required, Validators.min(1)]],
      destino: ['', [Validators.required, this.validarDestino]],
      plazas: ['', [Validators.required, Validators.min(1)]],
      fecha: [null],
      precio: [null],
      enOferta: [null],
      estado: [null]
    })
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes.viaje) {
  //     this.viajesForm.patchValue(changes.viaje.currentValue);
  //     if (changes.viaje.currentValue?.fechaSalida) {
  //       const t = this.formatFecha(changes.viaje.currentValue?.fechaSalida)
  //       this.viajesForm.controls.fecha.setValue(t);
  //     }
  //   }
  // }

  ngOnInit(): void {

    if (this.id) {
      this.viajesModel.getViajeById(this.id).subscribe(viaje => {
        if (viaje) {
          this.viajesForm.patchValue(viaje)
          if (viaje?.fechaSalida) {
            const t = formatFecha(viaje?.fechaSalida)
            this.viajesForm.controls.fecha.setValue(t);
          }
        }
      })
    }


    this.tiposDeViaje = this.viajesModel.getTiposDeViajes();
    // this.viajesForm.controls.destino.valueChanges.subscribe(x => {
    //   console.log(x);
    // });

    // this.viajesForm.controls.destino.valueChanges.subscribe((destino:string) => {
    //   if (destino?.toLowerCase() === "malaga") {
    //     this.viajesForm.controls.enOferta.setValue(true);
    //   } 
    //   // else {
    //   //   this.viajesForm.controls.enOferta.setValue(null);
    //   // }

    // this.viajesForm.controls.destino.valueChanges.subscribe((destino: string) => {
    //   if (destino?.toLowerCase() === "galicia") {
    //     this.viajesForm.controls.enOferta.disable();
    //   } else {
    //     this.viajesForm.controls.enOferta.enable();
    //   }
    // });

    // this.viajesForm.valueChanges.subscribe(x => {
    //   console.log(x)
    // })

    this.viajesForm.controls.tipoDeViajeId.valueChanges.subscribe((x: TipoDeViaje) => {
      if (+x === TipoDeViaje.Familiar && this.viaje?.precio) {
        this.viajesForm.controls.precio.setValue(this.viaje?.precio * 0.80);
      }
    })
  }formatFecha(fechaSalida: Date) {
    throw new Error('Method not implemented.');
  }
;

  guardarClick(form: FormGroup): void {
    this.submited = true;

    if (form.valid) {
      const viaje: Viaje = form.value;
      if (form.value.fecha) {
        viaje.fechaSalida = new Date(form.value.fecha)
      }

      this.viajesModel.guardar(viaje).subscribe(x => {
        this.toastMessage.showSuccess('Viaje guardado')
        this.router.navigate(['viajes']);
      })

    }
  }

  nuevoViajeClick(): void {
    this.viajesForm.reset();
  }

  resetForm(): void {
    this.submited = false;
    this.viajesForm.reset();
  }

  validarDestino(control: FormControl): { [s: string]: boolean } | null {
    if (control.value?.toLowerCase() === "londres") {
      return { invalidDestination: true }
    }

    return null;
  }


}

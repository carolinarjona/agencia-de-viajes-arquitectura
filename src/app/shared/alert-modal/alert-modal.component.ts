import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface AlertData{
  contenido: string;
  aceptar: string;
}

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: AlertData) { }

  ngOnInit(): void {
  }

}

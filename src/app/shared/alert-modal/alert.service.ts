import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AlertData, AlertModalComponent } from './alert-modal.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private dialog: MatDialog) { }

  aceptar(data: AlertData): Observable<any> {
    return this.dialog.open(AlertModalComponent, {
      data,
      disableClose: true,
    }).afterClosed()
  }
}

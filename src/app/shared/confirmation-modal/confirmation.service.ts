import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmationData, ConfirmationModalComponent } from './confirmation-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  constructor(private dialog: MatDialog) { }

  confirmar(data: ConfirmationData): Observable<any> {

    return this.dialog.open(ConfirmationModalComponent, {
      data,
      width: '500px',
      disableClose: true,
    }).afterClosed()
  }
}

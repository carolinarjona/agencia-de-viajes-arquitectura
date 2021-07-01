import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationService } from './confirmation-modal/confirmation.service';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { AlertService } from './alert-modal/alert.service';


@NgModule({
  declarations: [
    ConfirmationModalComponent,
    AlertModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule

  ],
  exports : [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule, 
  ],
  providers: [
    ConfirmationService,
    AlertService
  ]
})
export class SharedModule { }

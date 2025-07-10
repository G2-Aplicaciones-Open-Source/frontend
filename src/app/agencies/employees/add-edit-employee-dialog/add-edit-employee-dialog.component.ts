// src/app/agencies/employees/add-edit-employee-dialog/add-edit-employee-dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogActions
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Staff } from '../../model/staff.model';
import { StaffService } from '../../services/staff.service';

import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-add-edit-employee-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogContent,
    MatDialogActions
  ],
  templateUrl: './add-edit-employee-dialog.component.html',
  styleUrl: './add-edit-employee-dialog.component.scss'
})
export class AddEditEmployeeDialogComponent implements OnInit {
  employeeForm: FormGroup;
  isEdit: boolean;
  dialogTitle: string;
  agencyId: number;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employee: Staff; isEdit: boolean; agencyId: number },
    private staffService: StaffService
  ) {
    this.isEdit = data.isEdit;
    this.dialogTitle = this.isEdit ? 'Editar Empleado' : 'Agregar Nuevo Empleado';
    this.agencyId = data.agencyId;

    this.employeeForm = this.fb.group({
      id: [data.employee?.id || null],
      agencyId: [data.employee?.agencyId || this.agencyId, Validators.required],
      firstName: [data.employee?.firstName || '', Validators.required],
      lastName: [data.employee?.lastName || '', Validators.required],
      email: [data.employee?.email || '', [Validators.required, Validators.email]],
      phone: [data.employee?.phone || '', Validators.required],
      status: [data.employee?.status || 'Activo', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const employeeData: Staff = { ...this.employeeForm.value };

    if (this.isEdit) {
      this.staffService.updateStaff(employeeData.id, employeeData).pipe(
        map(updatedStaff => {
          console.log('Empleado actualizado:', updatedStaff);
          this.dialogRef.close(updatedStaff);
        }),
        catchError(err => {
          console.error('Error al actualizar empleado:', err);
          return of(null);
        })
      ).subscribe();
    } else {
      const newStaffData: Omit<Staff, 'id'> = {
        firstName: employeeData.firstName,
        lastName: employeeData.lastName,
        email: employeeData.email,
        phone: employeeData.phone,
        status: employeeData.status,
        agencyId: employeeData.agencyId
      };

      this.staffService.addStaff(newStaffData).pipe(
        map(addedStaff => {
          console.log('Nuevo empleado agregado:', addedStaff);
          this.dialogRef.close(addedStaff);
        }),
        catchError(err => {
          console.error('Error al agregar empleado:', err);
          return of(null);
        })
      ).subscribe();
    }
  }
}

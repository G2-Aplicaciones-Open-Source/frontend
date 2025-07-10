import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddEditEmployeeDialogComponent } from './add-edit-employee-dialog/add-edit-employee-dialog.component'; // <--- Asegúrate que esta importación sea correcta
import { StaffService } from '../services/staff.service';
import { Staff } from '../model/staff.model';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface Employee extends Staff {}

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    AddEditEmployeeDialogComponent
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit {

  employees: Staff[] = [];
  private currentAgencyId: number = 1;

  constructor(
    public dialog: MatDialog,
    private staffService: StaffService
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.staffService.getStaffByAgencyId(this.currentAgencyId).subscribe({
      next: (data) => {
        this.employees = data;
        console.log('Empleados cargados:', data);
      },
      error: (err) => {
        console.error('Error al cargar empleados:', err);
      }
    });
  }
  openAddEmployeeDialog(): void {
    const dialogRef = this.dialog.open(AddEditEmployeeDialogComponent, {
      width: '400px',
      data: { employee: null, isEdit: false, agencyId: this.currentAgencyId },
      panelClass: 'add-edit-employee-dialog-panel'
    });
    dialogRef.afterClosed().subscribe((result: Staff) => {
      if (result) {
        this.staffService.addStaff(result).subscribe({
          next: (newEmployee) => {
            console.log('Nuevo empleado guardado en el backend:', newEmployee);
            this.employees.push(newEmployee);
          },
          error: (err) => {
            console.error('Error al guardar nuevo empleado:', err);
          }
        });
      }
    });
  }
  openEditEmployeeDialog(employee: Staff): void {
    const dialogRef = this.dialog.open(AddEditEmployeeDialogComponent, {
      width: '400px',
      data: { employee: { ...employee }, isEdit: true, agencyId: this.currentAgencyId },
      panelClass: 'add-edit-employee-dialog-panel'
    });
    dialogRef.afterClosed().subscribe((result: Staff) => {
      if (result) {
        this.staffService.updateStaff(result.id, result).subscribe({
          next: (updatedEmployee) => {
            console.log('Empleado editado en el backend:', updatedEmployee);
            const index = this.employees.findIndex(e => e.id === updatedEmployee.id);
            if (index !== -1) {
              this.employees[index] = updatedEmployee;
            }
          },
          error: (err) => {
            console.error('Error al editar empleado:', err);
          }
        });
      }
    });
  }
  deleteEmployee(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar a este empleado?')) {
      this.staffService.deleteStaff(id).subscribe({
        next: () => {
          console.log('Empleado eliminado del backend:', id);
          this.employees = this.employees.filter(employee => employee.id !== id);
        },
        error: (err) => {
          console.error('Error al eliminar empleado:', err);
        }
      });
    }
  }
}

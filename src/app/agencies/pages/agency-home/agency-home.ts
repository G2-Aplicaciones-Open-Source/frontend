// src/app/agencies/pages/agency-home/agency-home.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Agency } from '../../model/agency.model';
import { Staff } from '../../model/staff.model';
import { AgencyService } from '../../services/agency.service';
import { StaffService } from '../../services/staff.service';
import { Subject, takeUntil } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-agency-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    NgOptimizedImage,
    MatTableModule
  ],
  templateUrl: './agency-home.html',
  styleUrl: './agency-home.scss'
})
export class AgencyHomeComponent implements OnInit, OnDestroy {
  agency: Agency | null = null;
  staff: Staff[] = [];
  isLoadingAgency: boolean = true;
  isLoadingStaff: boolean = true;
  displayedColumns: string[] = ['fullName', 'email', 'phone', 'status', 'actions'];

  private destroy$ = new Subject<void>();

  private currentAgencyId: number = 1;

  constructor(
    private agencyService: AgencyService,
    private staffService: StaffService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAgencyData();
    this.loadStaffData();
  }

  loadAgencyData(): void {
    this.isLoadingAgency = true;
    this.agencyService.getAgencyById(this.currentAgencyId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Agency) => {
          this.agency = data;
          this.isLoadingAgency = false;
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error fetching agency data:', error);
          this.isLoadingAgency = false;
        }
      });
  }

  loadStaffData(): void {
    this.isLoadingStaff = true;
    this.staffService.getStaffByAgencyId(this.currentAgencyId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Staff[]) => {
          this.staff = data;
          this.isLoadingStaff = false;
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error fetching staff data:', error);
          this.isLoadingStaff = false;

        }
      });
  }

  getStaffFullName(staffMember: Staff): string {
    return `${staffMember.firstName} ${staffMember.lastName}`;
  }

  logout(): void {
    console.log('Logging out...');
    this.router.navigate(['/sign-in']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

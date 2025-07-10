import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-agency-layout',
  templateUrl: './agency-layout.html',
  styleUrl: './agency-layout.scss',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    NgOptimizedImage
  ],
})
export class AgencyLayout implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    console.log('User logged out from Agency Layout');
    this.router.navigate(['/sign-in']).then(success => {
      if (success) {
        console.log('Navigation to sign-in successful');
      } else {
        console.warn('Navigation to sign-in failed or was cancelled');
      }
    }).catch(error => {
      console.error('Error during navigation to sign-in:', error);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

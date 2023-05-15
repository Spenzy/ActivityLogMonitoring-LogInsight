import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { NgbDropdownModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

// Ng-ApexCharts
import { NgApexchartsModule } from "ng-apexcharts";
import { DashboardComponent } from './dashboard.component';
import { EmbedTableauVizComponent } from './embed-tableau-viz/embed-tableau-viz.component';
const vizURLs = [
  "https://public.tableau.com/views/Classeur1_16802748488610/DurationDashboard?:language=en-US&:display_count=n&:origin=viz_share_link",
  "https://public.tableau.com/views/Classeur1_16802748488610/LogsDashboard?:language=en-US&:display_count=n&:origin=viz_share_link"
]

const routes: Routes = [
  { path: '', redirectTo: 'jobs', pathMatch: 'full' },
  {
    path: 'jobs',
    component: DashboardComponent,
    data: { vizURL: vizURLs[0] }
  },
  {
    path: 'logs',
    component: DashboardComponent,
    data: { vizURL: vizURLs[1] }
  }
]

@NgModule({
  declarations: [DashboardComponent, EmbedTableauVizComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FeatherIconModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgApexchartsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }

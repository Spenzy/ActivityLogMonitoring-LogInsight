import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// Ng-ApexCharts
import { NgApexchartsModule } from "ng-apexcharts";

// Ng2-charts
import { NgChartsModule } from 'ng2-charts';

import { ChartsGraphsComponent } from './charts-graphs.component';
import { ApexchartsComponent } from './apexcharts/apexcharts.component';
import { ChartjsComponent } from './chartjs/chartjs.component';
import { SentimentalAnalysisComponent } from './sentimental-analysis/sentimental-analysis.component';
import { PredictiveModelsComponent } from './predictive-models/predictive-models.component';
import {ArchwizardModule} from "angular-archwizard";
import {ReactiveFormsModule} from "@angular/forms";
import {FeatherIconModule} from "../../../core/feather-icon/feather-icon.module";

const routes: Routes = [
  {
    path: '',
    component: ChartsGraphsComponent,
    children: [
      {
        path: '',
        redirectTo: 'apexcharts',
        pathMatch: 'full'
      },
      {
        path: 'apexcharts',
        component: ApexchartsComponent
      },
      {
        path: 'chartjs',
        component: ChartjsComponent
      },
      {
        path: 'SentimentalAnalysis',
        component: SentimentalAnalysisComponent
      },
      {
        path: 'PredictiveModels',
        component: PredictiveModelsComponent
      }
    ]
  }
]

@NgModule({
  declarations: [ ChartsGraphsComponent, ApexchartsComponent, ChartjsComponent, SentimentalAnalysisComponent, PredictiveModelsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgApexchartsModule, // Ng-ApexCharts
    NgChartsModule,
    ArchwizardModule,
    ReactiveFormsModule,
    FeatherIconModule,
    // Ng2-charts
  ]
})
export class ChartsGraphsModule { }

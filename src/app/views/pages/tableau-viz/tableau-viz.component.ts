import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tableau-viz',
  templateUrl: './tableau-viz.component.html',
  styleUrls: ['./tableau-viz.component.scss']
})
export class TableauVizComponent implements OnInit {

  constructor() { }

  // Inherit attributes from the parent component
  @Input() dashboardIndex = 0;
  @Input() toolbar = 'hidden';
  @Input() vizUrl = '';

  // Dashboard properties
  public VizIndex = 'Tableau-Viz-' + this.dashboardIndex;

  
  ngOnInit(): void {
  }

}

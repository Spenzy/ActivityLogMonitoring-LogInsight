import {Component, OnInit, Input, HostListener} from '@angular/core';

@Component({
  selector: 'app-embed-tableau-viz',
  templateUrl: './embed-tableau-viz.component.html',
  styleUrls: ['./embed-tableau-viz.component.scss']
})
export class EmbedTableauVizComponent implements OnInit {

  public isFavorite = false;
  public dashboardName = '';
  public viewIsFavorite = "favorite_border"
  public thisViz: any;

  constructor() { }

  // Inherit attributes from the parent component
  @Input() dashboardIndex = 0;
  @Input() toolbar = 'hidden';
  @Input() vizUrl = '';

  // Dashboard properties
  public VizIndex = 'Tableau-Viz-' + this.dashboardIndex;

  // Handle dashboard resizing
  public getScreenWidth: any;
  public getScreenHeight: any;
  private calculateDashboardSize = () => {
    const bufferSize = 25;
    this.getScreenWidth = window.innerWidth-bufferSize;
    this.getScreenHeight = (window.innerWidth-bufferSize)*3/4;
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.calculateDashboardSize();
  }



  ngOnInit(): void {
    this.calculateDashboardSize();
  }

}

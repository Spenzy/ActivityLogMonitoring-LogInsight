import {Component, OnInit} from '@angular/core';
import {DataMiningAPIService} from "../../../../services/data-mining-api.service";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {SentimentalAnalysisData} from "./SentimentalAnalysisData";

@Component({
  selector: 'app-sentimental-analysis',
  templateUrl: './sentimental-analysis.component.html',
  styleUrls: ['./sentimental-analysis.component.scss']
})
export class SentimentalAnalysisComponent implements OnInit {

  //chart init
  public lineChartOptions: any = {};
  public barChartOptions: any = {};
  public areaChartOptions: any = {};
  public mixedChartOptions: any = {};
  public donutChartOptions: any = {};
  public pieChartOptions: any = {};
  public heatMapChartOptions: any = {};
  public radarChartOptions: any = {};
  public scatterChartOptions: any = {};
  public radialBarChartOptions: any = {};

  obj = {
    primary        : "#6571ff",
    secondary      : "#7987a1",
    success        : "#05a34a",
    info           : "#66d1d1",
    warning        : "#fbbc06",
    danger         : "#ff3366",
    light          : "#e9ecef",
    dark           : "#060c17",
    muted          : "#7987a1",
    gridBorder     : "rgba(77, 138, 240, .15)",
    bodyColor      : "#b8c3d9",
    cardBg         : "#0c1427",
    fontFamily     : "'Roboto', Helvetica, sans-serif"
  }


  constructor(public dataMiningAPI: DataMiningAPIService) {

  }

  ngOnInit(): void {
    let sentimentAnalysisData = this.dataMiningAPI.getSentimentalAnalysis();
    this.countSentimentCategories(sentimentAnalysisData).subscribe({
      next: (data: any) => {
        console.log(data)
        this.donutChartOptions = getDonutChartOptions(this.obj, data);
      },
      error: (error: any) => console.log(error)
    });

    // Some RTL fixes.
    if (document.querySelector('html')?.getAttribute('dir') === 'rtl') {
      this.addRtlOptions();
    }
  }

  public countSentimentCategories(data: Observable<SentimentalAnalysisData[]>): Observable<{ [key: string]: number }> {
    return data.pipe(
      map(data => {
        return data.reduce((acc: any, curr) => {
          if (curr.Sentiment_Category in acc) {
            acc[curr.Sentiment_Category]++;
          } else {
            acc[curr.Sentiment_Category] = 1;
          }
          return acc;
        }, {});
      })
    );
  }

  //For RTL
  addRtlOptions() {
    // Lline chart
    this.lineChartOptions.yaxis.labels.offsetX = -10;

    // Bar chart
    this.barChartOptions.yaxis.labels.offsetX = -10;

    // Area chart
    this.areaChartOptions.yaxis.labels.offsetX = -10;
    this.areaChartOptions.yaxis.title.offsetX = -20;

    // Mixed chart
    this.mixedChartOptions.yaxis.labels.offsetX = -10;
    this.mixedChartOptions.yaxis.title.offsetX = -20;

    // HeatMap chart
    this.heatMapChartOptions.yaxis.labels.offsetX = -35;

    // Scatter chart
    this.scatterChartOptions.yaxis.labels.offsetX = -20;
  }

}

/**
 * Donut chart options
 */
function getDonutChartOptions(obj: any, data: any) {
  return {
    series: Object.values(data),
    labels: Object.keys(data),
    chart: {
      height: 300,
      type: "donut",
      foreColor: obj.bodyColor,
      background: obj.cardBg,
      toolbar: {
        show: true
      },
    },
    colors: [obj.danger,obj.primary,obj.secondary, obj.info],
    stroke: {
      colors: ['rgba(0,0,0,0)']
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: 'center',
      fontFamily: obj.fontFamily,
      itemMargin: {
        horizontal: 8,
        vertical: 0
      },
    },
    dataLabels: {
      enabled: true
    },
  }
};

/**
 * Bar chart options
 */
function getBarChartOptions(obj: any) {
  return {
    series: [{
      name: 'sales',
      data: [30,40,45,50,49,60,70,91,125]
    }],
    chart: {
      type: 'bar',
      height: '320',
      parentHeightOffset: 0,
      foreColor: obj.bodyColor,
      background: obj.cardBg,
      toolbar: {
        show: false
      },
    },
    colors: [obj.primary],
    grid: {
      padding: {
        bottom: -4
      },
      borderColor: obj.gridBorder,
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    xaxis: {
      type: 'datetime',
      categories: ['01/01/1991','01/01/1992','01/01/1993','01/01/1994','01/01/1995','01/01/1996','01/01/1997', '01/01/1998','01/01/1999'],
      axisBorder: {
        color: obj.gridBorder,
      },
      axisTicks: {
        color: obj.gridBorder,
      },
    },
    yaxis: {
      labels: {
        offsetX: 0
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 4
      }
    }
  }
};

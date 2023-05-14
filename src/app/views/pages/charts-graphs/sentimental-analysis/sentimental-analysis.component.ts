import {Component, OnInit} from '@angular/core';
import {DataMiningAPIService} from "../../../../services/data-mining-api.service";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {SentimentalAnalysisData} from "./SentimentalAnalysisData";

interface GroupedData {
  industry: string;
  sentimentCategory: string;
  count: number;
}

@Component({
  selector: 'app-sentimental-analysis',
  templateUrl: './sentimental-analysis.component.html',
  styleUrls: ['./sentimental-analysis.component.scss']
})
export class SentimentalAnalysisComponent implements OnInit {

  //chart init
  public lineChartOptions: any = {};
  public barChartOptions: any = {};
  public sentimentRateBarChartOptions: any = {};
  public industryBySentimentBarChartOptions: any = {};
  public sentimentByIndustryBarChartOptions: any = {};
  public productBySentimentBarChartOptions: any = {};
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
    let sentimentAnalysisData = this.dataMiningAPI.getSentimentalAnalysis()
    this.groupDataByProductAndSentiment(sentimentAnalysisData).subscribe({
      next: (data: any) => {
        this.productBySentimentBarChartOptions = getProductBySentimentBarChartOption(this.obj, data)
      },
      error: err => console.log(err)
    })
    this.countSentimentCategories(sentimentAnalysisData).subscribe({
      next: (data: any) => {
        this.donutChartOptions = getDonutChartOptions(this.obj, data);
      },
      error: (error: any) => console.log(error)
    })
    this.countSentimentRateAvg(sentimentAnalysisData).subscribe({
      next: (data: any) => {
        this.sentimentRateBarChartOptions = getRateBySentimentBarChartOptions(this.obj, data);
      },
      error: err => console.log(err)
    })
    this.groupDataByIndustryAndSentiment(sentimentAnalysisData).subscribe({
      next: (data: any) => {
        let top10Industries = data.sort((a: any, b: any) => {
          if (a.category < b.category) return -1;
          if (a.category > b.category) return 1;
          if (a.count > b.count) return -1;
          if (a.count < b.count) return 1;
          return 0;
        }).slice(0,10);
        this.industryBySentimentBarChartOptions = getIndustryBySentimentBarChartOptions(this.obj, data)
        this.sentimentByIndustryBarChartOptions = getSentimentByIndustryBarChartOptions(this.obj, data)
      },
      error: err => console.log(err)
    })
    this.countProducts(sentimentAnalysisData).subscribe({
      next: (data: any) => {
        let top5Products = Object.entries(data).sort((a: any, b: any) => b[1] - a[1]).slice(0, 5)
        this.radialBarChartOptions = getRadialBarChartOptions(this.obj, top5Products)
      },
      error: (error:any) => console.log(error)
    })

    // Some RTL fixes.
    if (document.querySelector('html')?.getAttribute('dir') === 'rtl') {
      this.addRtlOptions();
    }
  }

  public countProducts(data: Observable<SentimentalAnalysisData[]>): Observable<{ [key: string]: number }> {
    return data.pipe(
      map(data => {
        return data.reduce((acc: any, curr) => {
          if (curr.Product_Name in acc) {
            acc[curr.Product_Name]++;
          } else {
            acc[curr.Product_Name] = 1;
          }
          return acc;
        }, {});
      })
    );
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

  public countSentimentRateAvg(data: Observable<SentimentalAnalysisData[]>): Observable<{ [key: string]: number }> {
    return data.pipe(
      map(data => {
        const result: { [key: string]: { total: number, count: number } } = {};
        data.forEach(d => {
          if (!result[d.Sentiment_Category]) {
            result[d.Sentiment_Category] = { total: 0, count: 0 };
          }
          result[d.Sentiment_Category].total += d.Rate;
          result[d.Sentiment_Category].count++;
        });
        const averageResult: { [key: string]: number } = {};
        for (const key in result) {
          averageResult[key] = result[key].total / result[key].count;
        }
        return averageResult;
      })
    );
  }

  public groupDataByIndustryAndSentiment(data: Observable<SentimentalAnalysisData[]>): Observable<GroupedData[]> {
    return data.pipe(
      map((items: SentimentalAnalysisData[]) => {
        const groups = new Map<string, Map<string, number>>();
        items.forEach((item: SentimentalAnalysisData) => {
          const industry = item.Industry;
          const sentimentCategory = item.Sentiment_Category;
          if (!groups.has(industry)) {
            groups.set(industry, new Map<string, number>());
          }
          const innerMap:any = groups.get(industry);
          if (innerMap.has(sentimentCategory)) {
          } else {
            innerMap.set(sentimentCategory, 0);
          }
          innerMap.set(sentimentCategory, innerMap.get(sentimentCategory) + 1);
        });
        const result: GroupedData[] = [];
        groups.forEach((innerMap: Map<string, number>, industry: string) => {
          innerMap.forEach((count: number, sentimentCategory: string) => {
            result.push({ industry, sentimentCategory, count });
          });
        });
        return result;
      })
    );
  }

  public groupDataByProductAndSentiment(data: Observable<SentimentalAnalysisData[]>): Observable<{ product: string; sentimentCategory: string; count: number; }[]> {
    return data.pipe(
      map((items: SentimentalAnalysisData[]) => {
        const groups = new Map<string, Map<string, number>>();
        items.forEach((item: SentimentalAnalysisData) => {
          const product = item.Product_Name;
          const sentimentCategory = item.Sentiment_Category;
          if (!groups.has(product)) {
            groups.set(product, new Map<string, number>());
          }
          const innerMap:any = groups.get(product);
          if (innerMap.has(sentimentCategory)) {
          } else {
            innerMap.set(sentimentCategory, 0);
          }
          innerMap.set(sentimentCategory, innerMap.get(sentimentCategory) + 1);
        });
        const result: any[] = [];
        groups.forEach((innerMap: Map<string, number>, product: string) => {
          innerMap.forEach((count: number, sentimentCategory: string) => {
            result.push({ product, sentimentCategory, count });
          });
        });
        return result;
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

function getRateBySentimentBarChartOptions(obj: any, data: any) {
  return {
    series: [{
      name: 'Rating average by Sentiment Category',
      data: Object.values(data)
    }],
    chart: {
      type: 'bar',
      height: '320',
      parentHeightOffset: 0,
      foreColor: obj.bodyColor,
      background: obj.cardBg,
      toolbar: {
        show: true
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
      type: 'category',
      categories: Object.keys(data),
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
      },
      min: 0,
      max: 5,
      tickAmount: 6,
      forceNiceScale: true,
      decimalsInFloat: 1
    },
    plotOptions: {
      bar: {
        borderRadius: 4
      }
    }
  }
}

function getIndustryBySentimentBarChartOptions(obj: any, data: any) {

  let categories: any[] = [];
  data.map((x: any) => { !(categories.includes(x.industry))? categories.push(x.industry):null;})

  return {
    series: [
      {
        name: 'Negative',
        data: data.filter((x: any) => x.sentimentCategory == "Negative").map((x: any) => {return x.count}).slice(0,10)
      },
      {
        name: 'Neutral',
        data: data.filter((x: any) => x.sentimentCategory == "Neutral").map((x: any) => {return x.count}).slice(0,10)
      },
      {
        name: 'Positive',
        data: data.filter((x: any) => x.sentimentCategory == "Positive").map((x: any) => {return x.count}).slice(0,10)
      }
    ],
    chart: {
      type: 'bar',
      height: '320',
      parentHeightOffset: 0,
      foreColor: obj.bodyColor,
      background: obj.cardBg,
      toolbar: {
        show: true
      },
    },
    colors: [obj.primary, obj.secondary, obj.info],
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
      type: 'category',
      categories: categories.slice(0,10),
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
      },
      min: 0,
      max: 15,
      tickAmount: 6,
      forceNiceScale: true,
      decimalsInFloat: 1,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 4,
        columnWidth: '70%',
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      offsetY: -30,
      fontSize: '10px',
      markers: {
        radius: 12
      },
      itemMargin: {
        vertical: 10
      }
    },

  };
}

function getSentimentByIndustryBarChartOptions(obj: any, data: any) {
  const groupByIndustry = data.reduce((group: { [x: string]: any[]; }, value: any) => {
    const { industry, count } = value;
    group[industry] = group[industry] ?? [];
    group[industry].push(count);
    return group;
  }, {});

  let names = Object.keys(groupByIndustry).slice(0,10)

  return {
    series: names.map((x: any) => {return { name: x, data: groupByIndustry[x] } }),
    chart: {
      type: 'bar',
      height: '320',
      parentHeightOffset: 0,
      foreColor: obj.bodyColor,
      background: obj.cardBg,
      toolbar: {
        show: true
      },
    },
    colors: [obj.primary, obj.secondary, obj.info, obj.danger, obj.warning, obj.light, obj.dark, obj.muted],
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
      type: 'category',
      categories: ["Positive", "Neutral", "Negative"],
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
      },
      tickAmount: 6,
      forceNiceScale: true,
      decimalsInFloat: 1,
      max: 20
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 4,
        columnWidth: '70%',
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      offsetY: -30,
      fontSize: '10px',
      markers: {
        radius: 12
      },
      itemMargin: {
        vertical: 10
      }
    },
  };
}

function getRadialBarChartOptions(obj: any, data: any) {
  let dataValues: any[] = [];
  let dataCategories: any[] = [];
  data.forEach((item: any) => {
    dataValues.push(item[1])
    dataCategories.push(item[0])
  })

  return {
    series: dataValues,
    chart: {
      height: 300,
      type: "radialBar",
      parentHeightOffset: 0,
      foreColor: obj.bodyColor,
      background: obj.cardBg,
      toolbar: {
        show: true
      },
    },
    colors: [obj.primary, obj.warning, obj.danger, obj.info, obj.light],
    grid: {
      padding: {
        top: 10
      }
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          total: {
            show: false,
            label: 'TOTAL',
            fontSize: '14px',
            fontFamily: obj.fontFamily,
          }
        },
        track: {
          background: obj.gridBorder,
          strokeWidth: '100%',
          opacity: 1,
          margin: 5
        },
      }

    },
    labels: dataCategories,
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
  }
}

function getProductBySentimentBarChartOption(obj: any, data: any) {
  const groupByProduct = data.reduce((group: { [x: string]: any[]; }, value: any) => {
    const { product, count } = value;
    group[product] = group[product] ?? [];
    group[product].push(count);
    return group;
  }, {});

  let names = Object.keys(groupByProduct)

  return {
    series: names.map((x: any) => {return { name: x, data: groupByProduct[x] } }),
    chart: {
      type: 'bar',
      height: '320',
      parentHeightOffset: 0,
      foreColor: obj.bodyColor,
      background: obj.cardBg,
      toolbar: {
        show: true
      },
    },
    colors: [obj.secondary, obj.primary, obj.info, obj.danger, obj.warning, obj.light, obj.muted, obj.dark],
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
      type: 'category',
      categories: ["Positive", "Neutral", "Negative"],
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
      },
      tickAmount: 6,
      forceNiceScale: true,
      decimalsInFloat: 1
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 4,
        columnWidth: '70%',
      }
    },
    responsive: {
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        offsetY: -30,
        fontSize: '10px',
        markers: {
          radius: 12
        },
        itemMargin: {
          vertical: 10
        }
      },
    }
  }

}

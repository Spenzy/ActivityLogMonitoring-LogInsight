import {Component, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {WizardComponent as BaseWizardComponent} from "angular-archwizard/lib/components/wizard.component";
import {DataMiningAPIService} from "../../../../services/data-mining-api.service";

@Component({
  selector: 'app-predictive-models',
  templateUrl: './predictive-models.component.html',
  styleUrls: ['./predictive-models.component.scss']
})
export class PredictiveModelsComponent implements OnInit {

  public durationVolumeScatterChartOptions: any = {};
  public durationComponentScatterChartOptions: any = {};

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

  validationFormDuration: UntypedFormGroup;
  validationFormCluster: UntypedFormGroup;

  isFormDurationSubmitted: Boolean;
  isFormClusterSubmitted: Boolean;

  @ViewChild('durationWizardForm') durationWizardForm: BaseWizardComponent;
  @ViewChild('clusterWizardForm') clusterWizardForm: BaseWizardComponent;
  dataVolume : any = '';
  nbrComponents : any = '';
  jobDuration : any = '';
  predictedCluster: any = '';


  constructor(public formBuilder: UntypedFormBuilder, private dataMiningAPI: DataMiningAPIService ) { }

  ngOnInit(): void {
    this.dataMiningAPI.getCAHSegmentation().subscribe({
      next: (data: any) => {

        this.durationVolumeScatterChartOptions = getDurationVolumeScatterChartOptions(this.obj, data)
        this.durationComponentScatterChartOptions = getDurationComponentScatterChartOptions(this.obj, data)
      },
        error: (error: any) => console.log(error)
    })

    /**
     * Duration value validation
     */
    this.validationFormDuration = this.formBuilder.group({
      dataVolume : [this.dataVolume, [Validators.required, Validators.min(1), Validators.pattern('^(0|[1-9][0-9]*)$')]],
      nbrComponents : [this.nbrComponents, [Validators.required, Validators.min(1), Validators.pattern('^(0|[1-9][0-9]*)$')]]
    });

    /**
     * Cluster value validation
     */
    this.validationFormCluster = this.formBuilder.group({
      dataVolume : [this.dataVolume, [Validators.required, Validators.min(1), Validators.pattern('^(0|[1-9][0-9]*)$')]],
      nbrComponents : [this.nbrComponents, [Validators.required, Validators.min(1), Validators.pattern('^(0|[1-9][0-9]*)$')]],
      jobDuration : [this.nbrComponents, [Validators.required, Validators.min(1), Validators.pattern('^(0|[1-9][0-9]*)$')]]
    });

    this.isFormDurationSubmitted = false;
    this.isFormClusterSubmitted = false;

  }

  /**
   * Returns form
   */
  get formDuration() {
    return this.validationFormDuration.controls;
  }

  /**
   * Returns form
   */
  get formCluster() {
    return this.validationFormCluster.controls;
  }

  /**
   * Go to next step while form value is valid
   */
  formDurationSubmit() {
    if(this.validationFormDuration.valid) {
      this.dataMiningAPI.predictDuration(Number(this.dataVolume), Number(this.nbrComponents)).subscribe({
        next: data =>{
          console.log(data)
          this.jobDuration = data["jobDuration"]
        },
        error: err => console.log(err)
      })
      this.durationWizardForm.goToNextStep();
    }
    this.isFormDurationSubmitted = true;
  }

  /**
   * Go to next step while form value is valid
   */
  formClusterSubmit() {
    if(this.validationFormCluster.valid) {
      this.dataMiningAPI.predictCluster(Number(this.dataVolume), Number(this.jobDuration), Number(this.nbrComponents)).subscribe({
        next: data => {
          console.log(data)
          data["predicted_cluster"] === 0 ? this.predictedCluster = "Simple": data["predicted_cluster"] === 1 ? this.predictedCluster = "Moderate": data["predicted_cluster"] === 2 ? this.predictedCluster = "Complex" : this.predictedCluster = "Unmeasurable"
        },
        error: err => console.log(err)
      })
      this.clusterWizardForm.goToNextStep();
    }
    this.isFormClusterSubmitted = true;
  }

}

function getDurationVolumeScatterChartOptions(obj: any, data: any) {
  const groupDurationViByCluster = data.reduce((group: { [x: string]: any[]; }, value: any) => {
    const { Data_Volume, Job_Duration, Cluster } = value;
    group[Cluster] = group[Cluster] ?? [];
    group[Cluster].push([Data_Volume, Job_Duration]);
    return group;
  }, {});

  return {
    series: [
      {
        name: "Simple",
        data: groupDurationViByCluster[0].slice(0,100)
      },{
        name: "Moderate",
        data: groupDurationViByCluster[1].slice(0,100)
      },{
        name: "Complex",
        data: groupDurationViByCluster[2].slice(0,100)
      }
    ],
    chart: {
      height: 300,
      type: 'scatter',
      parentHeightOffset: 0,
      foreColor: obj.bodyColor,
      background: obj.cardBg,
      toolbar: {
        show: false
      },
    },
    colors: [obj.primary, obj.warning, obj.danger],
    grid: {
      borderColor: obj.gridBorder,
      padding: {
        bottom: -4
      },
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    markers: {
      strokeColor: obj.cardBg,
      hover: {
        strokeColor: obj.cardBg

      }
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
    xaxis: {
      title: {
        text: "Job Duration",
        rotate: -90,
        offsetX: 0,
        offsetY: 0,
        style: {
          color: undefined,
          fontSize: '12px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 600,
          cssClass: 'apexcharts-yaxis-title',
        },
      },
      axisBorder: {
        color: obj.gridBorder,
      },
      axisTicks: {
        color: obj.gridBorder,
      },
      tickAmount: 10,
      labels: {
        formatter: function(val: any) {
          return parseFloat(val).toFixed(1)
        }
      }
    },
    yaxis: {
      title: {
        text: "Data Volume",
        rotate: -90,
        offsetX: 0,
        offsetY: 0,
        style: {
          color: undefined,
          fontSize: '12px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 600,
          cssClass: 'apexcharts-yaxis-title',
        },
      },
      tickAmount: 7,
      labels: {
        offsetX: 0
      }
    }
  }
}

function getDurationComponentScatterChartOptions(obj: any, data: any) {
  const groupDurationViByCluster = data.reduce((group: { [x: string]: any[]; }, value: any) => {
    const { Nbr_Components, Job_Duration, Cluster } = value;
    group[Cluster] = group[Cluster] ?? [];
    group[Cluster].push([Nbr_Components, Job_Duration]);
    return group;
  }, {});


  return {
    series: [
      {
        name: "Simple",
        data: groupDurationViByCluster[0].slice(0,100)
      },{
        name: "Moderate",
        data: groupDurationViByCluster[1].slice(0,100)
      },{
        name: "Complex",
        data: groupDurationViByCluster[2].slice(0,100)
      }
    ],
    chart: {
      height: 300,
      type: 'scatter',
      parentHeightOffset: 0,
      foreColor: obj.bodyColor,
      background: obj.cardBg,
      toolbar: {
        show: false
      },
    },
    colors: [obj.primary, obj.warning, obj.danger],
    grid: {
      borderColor: obj.gridBorder,
      padding: {
        bottom: -4
      },
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    markers: {
      strokeColor: obj.cardBg,
      hover: {
        strokeColor: obj.cardBg

      }
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
    xaxis: {
      title: {
        text: "Job Duration",
        rotate: -90,
        offsetX: 0,
        offsetY: 0,
        style: {
          color: undefined,
          fontSize: '12px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 600,
          cssClass: 'apexcharts-yaxis-title',
        },
      },
      axisBorder: {
        color: obj.gridBorder,
      },
      axisTicks: {
        color: obj.gridBorder,
      },
      tickAmount: 10,
      labels: {
        formatter: function(val: any) {
          return parseFloat(val).toFixed(1)
        }
      }
    },
    yaxis: {
      title: {
        text: "Number of Components",
        rotate: -90,
        offsetX: 0,
        offsetY: 0,
        style: {
          color: undefined,
          fontSize: '12px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 600,
          cssClass: 'apexcharts-yaxis-title',
        },
      },
      tickAmount: 7,
      labels: {
        offsetX: 0
      }
    }
  }
}

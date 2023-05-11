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

  jobDuration: any;

  validationFormDuration: UntypedFormGroup;
  validationForm2: UntypedFormGroup;

  isFormDurationSubmitted: Boolean;
  isForm2Submitted: Boolean;

  @ViewChild('durationWizardForm') durationWizardForm: BaseWizardComponent;


  constructor(public formBuilder: UntypedFormBuilder, private dataMiningAPI: DataMiningAPIService ) { }

  ngOnInit(): void {
    /**
     * form1 value validation
     */
    this.validationFormDuration = this.formBuilder.group({
      dataVolume : ['', Validators.required],
      nbrComponents : ['', Validators.required]
      //dataVolume : ['', Validators.required, Validators.min(1), Validators.pattern('^(0|[1-9][0-9]*)$)')],
      //nbrComponents : ['', Validators.required,Validators.min(1), Validators.pattern('^(0|[1-9][0-9]*)$)')]
    });

    /**
     * formw value validation
     */
    this.validationForm2 = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      mobileNumber : ['', Validators.required],
      password : ['', Validators.required]
    });

    this.isFormDurationSubmitted = false;
    this.isForm2Submitted = false;

  }

  /**
   * Wizard finish function
   */
  finishFunction() {
    alert('Successfully Completed');
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
  get form2() {
    return this.validationForm2.controls;
  }

  /**
   * Go to next step while form value is valid
   */
  formDurationSubmit(dataVolume: any, nbrComponents: any) {
    if(this.validationFormDuration.valid) {
      this.dataMiningAPI.predictDuration(dataVolume, nbrComponents).subscribe({
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
  form2Submit() {
    if(this.validationForm2.valid) {
      this.durationWizardForm.goToNextStep();
    }
    this.isForm2Submitted = true;
  }

}

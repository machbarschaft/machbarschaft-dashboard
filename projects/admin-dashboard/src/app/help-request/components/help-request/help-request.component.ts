import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HelpRequest} from '../../../shared/models/helpRequest.interface';
import {HelpRequestService} from '../../../shared/services/backend/help-request.service';
import {BreakPointObserverService} from '../../../../../../style-lib/src/lib/services/break-point-observer.service';
import {REQUEST_STATUS} from '../../../shared/models/constants.interface';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {AsyncPipe, DatePipe} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {MbsTranslateService} from '../../../shared/services/mbs-translate.service';

@Component({
  selector: 'mbs-ad-help-request',
  templateUrl: './help-request.component.html',
  styleUrls: ['./help-request.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ AsyncPipe, DatePipe ]
})
export class HelpRequestComponent implements OnInit {

  #helpRequestId: string;
  helpRequest: HelpRequest;
  submitted: boolean = false;
  updateFailed: boolean = false;
  success: boolean = false;

  helpRequestForm = new FormGroup({
    requestText: new FormControl({ value: '', disabled: true }, [Validators.required]),
    fullName: new FormControl({ value: '', disabled: true }, [Validators.required]),
    phone: new FormControl({ value: '', disabled: true }, [Validators.required]),
    requestStatus: new FormControl({ value: '', disabled: true }),
    updatedAt: new FormControl({ value: '', disabled: true })
  });

  constructor(private activatedRoute: ActivatedRoute,
              private helpRequestService: HelpRequestService,
              public breakpointObserver: BreakPointObserverService,
              private asyncPipe: AsyncPipe,
              private datePipe: DatePipe,
              private translateService: TranslateService,
              private mbsTranslateService: MbsTranslateService,
              private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe()
      .subscribe(params => {
        this.#helpRequestId = params['id'];
        this.helpRequestService.getHelpRequest(this.#helpRequestId)
          .subscribe((helpRequest: HelpRequest) => {
            this._updateHelpRequestForm(helpRequest);
          });
      });

    this.mbsTranslateService.languageChanged()
      .subscribe(() => this._updateHelpRequestForm());
  }

  updateStatus(status: REQUEST_STATUS): void {
    if (this.helpRequest.requestStatus !== status) {
      this.helpRequestService.updateHelpRequestStatus(this.helpRequest.id, status)
        .subscribe((helpRequest: HelpRequest) => {
          this._updateHelpRequestForm(helpRequest);
        }, () => {
          console.log('updating status has not worked');
        });
    }
  }

  saveChanges(): void {
    this.submitted = true;
    this.success = false;
    this.changeDetectorRef.detectChanges();

    if (this.helpRequestForm.valid) {
      const newHelpRequest: HelpRequest = {
        id: this.helpRequest.id,
        requestText: this.getAbstractControl('requestText').value,
        helpSeeker: {
          id: this.helpRequest.helpSeeker.id,
          fullName: this.getAbstractControl('fullName'),
          phone: this.getAbstractControl('phone'),
          source: this.helpRequest.helpSeeker.source,
          enteredBy: this.helpRequest.helpSeeker.enteredBy,
          user: this.helpRequest.helpSeeker.user
        },
        requestStatus: this.helpRequest.requestStatus,
        adminUser: this.helpRequest.adminUser,
        createdAt: this.helpRequest.createdAt,
        updatedAt: this.helpRequest.updatedAt
      };

      this.helpRequestService.updateHelpRequest(newHelpRequest)
        .subscribe(helpRequest => {
          this.updateFailed = false;
          this.submitted = false;
          this.success = true;
          this._updateHelpRequestForm(helpRequest);
          this.changeDetectorRef.detectChanges();
        }, () => {
          this.updateFailed = true;
          this.success = false;
          this.changeDetectorRef.detectChanges();
        });
    }
  }

  getAbstractControl(key: string): AbstractControl | null {
    return this.helpRequestForm.get(key);
  }

  private _updateHelpRequestForm(helpRequest?: HelpRequest): void {
    if (helpRequest) {
      this.helpRequest = helpRequest;
    }
    this.helpRequestForm.patchValue({
      requestText: this.helpRequest && this.helpRequest.requestText ? this.helpRequest.requestText : '',
      fullName: this.helpRequest && this.helpRequest.helpSeeker.fullName ? this.helpRequest.helpSeeker.fullName : '',
      phone: this.helpRequest && this.helpRequest.helpSeeker.phone ? this.helpRequest.helpSeeker.phone : '',
      requestStatus: this.helpRequest ? this.asyncPipe.transform(
        this.translateService.get(`common.${this.helpRequest.requestStatus}`)) : '',
      updatedAt: this.helpRequest ? this.datePipe.transform(this.helpRequest.updatedAt) : ''
    });
    this.changeDetectorRef.detectChanges();
  }

}

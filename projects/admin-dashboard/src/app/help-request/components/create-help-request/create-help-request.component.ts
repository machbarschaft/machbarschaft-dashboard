import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {BreakPointObserverService} from '../../../../../../style-lib/src/lib/services/break-point-observer.service';
import {HelpRequestService} from '../../../shared/services/backend/help-request.service';
import {HelpRequest} from '../../../shared/models/helpRequest.interface';
import {HelpSeekerService} from '../../../shared/services/backend/help-seeker.service';
import {HelpSeeker} from '../../../shared/models/helpSeeker.interface';

@Component({
  selector: 'mbs-ad-create-help-request',
  templateUrl: './create-help-request.component.html',
  styleUrls: ['./create-help-request.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class CreateHelpRequestComponent {

  helpRequestGroupForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    requestText: new FormControl('', Validators.required)
  });
  submitted: boolean = false;
  noInternetConnection: boolean = false;
  success: boolean = false;

  constructor(private helpSeekerService: HelpSeekerService,
              private helpRequestService: HelpRequestService,
              private changeDetectorRef: ChangeDetectorRef,
              public breakpointObserver: BreakPointObserverService) {}

  onSubmit(): void {
    this.submitted = true;
    this.noInternetConnection = false;
    if (this.helpRequestGroupForm.valid) {
      const helpSeeker: HelpSeeker = {
        fullName: this.helpRequestGroupForm.get('fullName').value,
        phone: this.helpRequestGroupForm.get('phone').value,
        source: 'ADMIN'
      };

      this.helpSeekerService.createHelpSeeker(helpSeeker)
        .subscribe((createdHelpSeeker: HelpSeeker) => {
          if (createdHelpSeeker) {
            const helpRequest: HelpRequest = {
              requestText: this.helpRequestGroupForm.get('requestText').value,
              requestStatus: 'OPEN',
              helpSeeker: createdHelpSeeker.id
            };

            this.helpRequestService.createHelpRequest(helpRequest).subscribe((helpRequestResponse: HelpRequest) => {
              // ToDo: send feedback to user
              console.log('response', helpRequestResponse);
              this.helpRequestGroupForm.reset({
                name: '',
                phone: '',
                requestText: ''
              });
              this.submitted = false;
              this.success = true;
              this.changeDetectorRef.detectChanges();
            }, (error) => {
              console.log('error', error);
              this.noInternetConnection = true;
              this.changeDetectorRef.detectChanges();
            });
          }
        }, () => {
          console.log('error while creating help seeker');
          this.noInternetConnection = true;
          this.changeDetectorRef.detectChanges();
        });
    }
  }

  getAbstractControl(key: string): AbstractControl | null {
    return this.helpRequestGroupForm.get(key);
  }
}


import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {OrderApiService} from '../../../shared/services/backend/order-api.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BreakPointObserverService} from '../../../../../../style-lib/src/lib/services/break-point-observer.service';
import {HelpRequestService} from '../../../shared/services/backend/help-request.service';
import {HelpRequest} from '../../../shared/models/helpRequest.interface';
import {HelpSeekerService} from '../../../shared/services/backend/help-seeker.service';
import {HelpSeeker} from '../../../shared/models/helpSeeker.interface';

@Component({
  selector: 'mbs-ad-create-order',
  templateUrl: './create-help-request.component.html',
  styleUrls: ['./create-help-request.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class CreateHelpRequestComponent {

  helpRequestGroupForm = new FormGroup({
    fullName: new FormControl(''),
    phone: new FormControl(''),
    requestText: new FormControl('', Validators.required)
  });

  constructor(private orderApiService: OrderApiService,
              private helpSeekerService: HelpSeekerService,
              private helpRequestService: HelpRequestService,
              public breakpointObserver: BreakPointObserverService) {}

  onSubmit(): void {
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
            }, (error) => {
              console.log('error', error);
            });
          }
        }, () => {
          console.log('error while creating help seeker');
        });
    }
  }
}


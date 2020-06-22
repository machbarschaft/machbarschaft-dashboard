import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {OrderApiService} from '../../../shared/services/backend/order-api.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BreakPointObserverService} from '../../../../../../style-lib/src/lib/services/break-point-observer.service';
import {HelpRequestService} from '../../../shared/services/backend/help-request.service';
import {HelpRequest} from '../../../shared/models/helpRequest.interface';

@Component({
  selector: 'mbs-ad-create-order',
  templateUrl: './create-help-request.component.html',
  styleUrls: ['./create-help-request.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class CreateHelpRequestComponent {

  helpRequestGroupForm = new FormGroup({
    requestText: new FormControl('', Validators.required),
  });

  constructor(private orderApiService: OrderApiService,
              private helpRequestService: HelpRequestService,
              public breakpointObserver: BreakPointObserverService) {}

  onSubmit(): void {
    if (this.helpRequestGroupForm.valid) {
      const helpRequest: HelpRequest = {
        requestText: this.helpRequestGroupForm.get('requestText').value,
        requestStatus: 'OPEN',
        adminUser: null
      };

      this.helpRequestService.postHelpRequest(helpRequest).subscribe((helpRequestResponse: HelpRequest) => {
        // ToDo: send feedback to user
        console.log('response', helpRequestResponse);
      }, (error) => {
        console.log('error', error);
      });
      this.helpRequestGroupForm.reset({
        requestText: ''
      });
    }
  }
}


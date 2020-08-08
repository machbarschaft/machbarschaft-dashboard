import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HelpRequest} from '../../../shared/models/helpRequest.interface';
import {HelpRequestService} from '../../../shared/services/backend/help-request.service';
import {BreakPointObserverService} from '../../../../../../style-lib/src/lib/services/break-point-observer.service';
import {REQUEST_STATUS} from '../../../shared/models/constants.interface';

@Component({
  selector: 'mbs-ad-help-request',
  templateUrl: './help-request.component.html',
  styleUrls: ['./help-request.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpRequestComponent implements OnInit {

  #helpRequestId: string;
  helpRequest: HelpRequest;

  constructor(private activatedRoute: ActivatedRoute,
              private helpRequestService: HelpRequestService,
              public breakpointObserverService: BreakPointObserverService,
              private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe()
      .subscribe(params => {
        this.#helpRequestId = params['id'];
        this.helpRequestService.getHelpRequest(this.#helpRequestId)
          .subscribe((helpRequest: HelpRequest) => {
            console.log('helpRequest', helpRequest);
            this.helpRequest = helpRequest;
            this.changeDetectorRef.detectChanges();
          });
      });
  }

  updateStatus(status: REQUEST_STATUS): void {
    if (this.helpRequest.requestStatus !== status) {
      this.helpRequestService.updateHelpRequestStatus(this.helpRequest.id, status)
        .subscribe((helpRequest: HelpRequest) => {
          this.helpRequest = helpRequest;
          this.changeDetectorRef.detectChanges();
        }, () => {
          console.log('updating status has not worked');
        });
    }
  }

}

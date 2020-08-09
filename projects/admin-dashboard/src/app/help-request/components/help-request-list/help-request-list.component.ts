import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BreakPointObserverService} from '../../../../../../style-lib/src/lib/services/break-point-observer.service';
import {HelpRequest} from '../../../shared/models/helpRequest.interface';
import {HelpRequestService} from '../../../shared/services/backend/help-request.service';
import {REQUEST_STATUS} from '../../../shared/models/constants.interface';

@Component({
  selector: 'mbs-ad-help-request-list',
  templateUrl: './help-request-list.component.html',
  styleUrls: ['./help-request-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class HelpRequestListComponent implements OnInit {

  helpRequests: HelpRequest[];
  isMobile: boolean;

  constructor(private helpRequestApiService: HelpRequestService,
              public breakPointObserverService: BreakPointObserverService,
              private changeDetectorRef: ChangeDetectorRef) {
    this.helpRequests = [];
    this.isMobile = false;
  }

  ngOnInit(): void {
    this.helpRequestApiService.getHelpRequests()
      .subscribe((helpRequests: HelpRequest[]) => {
        console.log('helpRequests', helpRequests);
        this.helpRequests = helpRequests;
        this.changeDetectorRef.detectChanges();
      }, () => {
        this.helpRequests = [];
        this.changeDetectorRef.detectChanges();
      });
  }

  updateStatus(request: HelpRequest, status: REQUEST_STATUS): void {
    if (request.requestStatus !== status) {
      this.helpRequestApiService.updateHelpRequestStatus(request.id, status)
        .subscribe((helpRequest: HelpRequest) => {
          const index = this.helpRequests.findIndex((r) => r.id === request.id);
          if (index > -1) {
            this.helpRequests.splice(index, 1, helpRequest);
            this.changeDetectorRef.detectChanges();
          }
        }, () => {
          console.log('updating status has not worked');
        });
    }
  }

}

import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {OrderApiService} from '../../../shared/services/backend/order-api.service';
import {BreakPointObserverService} from '../../../../../../style-lib/src/lib/services/break-point-observer.service';
import {HelpRequest} from '../../../shared/models/helpRequest.interface';
import {HelpRequestService} from '../../../shared/services/backend/help-request.service';

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

  constructor(private orderApiService: OrderApiService,
              private helpRequestApiService: HelpRequestService,
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

}

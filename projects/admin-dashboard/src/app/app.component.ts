import { HelpSeeker } from './shared/models/helpSeeker.interface';
import { STATUS, SOURCE } from './shared/models/constants.interface';
import { HelpRequest } from './shared/models/helpRequest.interface';
import { HelpSeekerService } from './shared/services/backend/help-seeker.service';
import { HelpRequestService } from './shared/services/backend/help-request.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private hrs: HelpRequestService, private hss: HelpSeekerService) { }

  ngOnInit(): void {
  }


  // api tests
/*
  apiTest() {
    // gets:
    this.hrs.getHelpRequests().subscribe((result) => {
      console.log('HelpReq:' + result);
      console.log(result[1].id);
      // get 1 byID
      this.hrs.getHelpRequest(result[1].id).subscribe((innerResult) => {
        console.log(innerResult);

      });
    });
    this.hss.getHelpSeekers().subscribe((result) => {
      console.log('HelpSeek: ' + result);
      this.hss.getHelpSeeker(result[1].id).subscribe((innerResult) => {
        console.log(innerResult);
      });
    });
    // posts
    const helpRequest: HelpRequest = { requestText: 'TEST', requestStatus: 'TO_BE_DELIVERED', adminUser: 'admin' };
    this.hrs.postHelpRequest(helpRequest).subscribe(result => console.log(result));
    const helpSeeker: HelpSeeker = {fullName: 'MAX MUSTI', source: 'APP', phone: '0815', enteredBy: 'ME'};
    this.hss.postHelpRequest(helpSeeker).subscribe(result => console.log(result));
  }
  */
}

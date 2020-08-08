import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/public-api';

@Component({
  selector: 'mbs-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  mode: string;
  actionCode: string;
  newPassword: string = '';
  newPasswordConfirm: string = '';
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.mode = params['mode'];
      this.actionCode = params['oobCode'];
    });

  }

  resetPassword() {
    if (this.newPassword === this.newPasswordConfirm) {
      this.authService.confirmPasswordReset(this.actionCode, this.newPassword)
        .then((res) => {
            console.log({res});
        })
        .catch(
          (err) => {
            console.log({err});
          }
        );
    }
  }

}


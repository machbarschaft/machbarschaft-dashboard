import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../shared/public-api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'mbs-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})

export class RolesComponent implements OnInit {

  addAminForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });
  emailError: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  addAmin() {
    if (this.addAminForm.valid) {
      // Form is valid and reset error
      this.emailError = false;

      // fehelnde funktion: aus mail userID bekommen
      /*
      this.userService.makeUserToAdmin('userID').subscribe((response) => {

      });
      */

    } else {
      if (this.addAminForm.get('email').invalid) {
        this.emailError = true;
      }
    }
  }

  }
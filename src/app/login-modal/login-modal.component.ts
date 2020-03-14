import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StateService } from '../state.service';
import { SasService } from '../sas.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  @ViewChild('loginForm', { static: true }) loginFormTemplate: TemplateRef<any>;

  userName = '';
  password = '';
  private dialogRef: MatDialogRef<LoginModalComponent>;

  constructor(
    public dialog: MatDialog,
    public stateService: StateService,
    public sasService: SasService
    ) {}

  ngOnInit() {
    this.showLoginModal();
  }

  showLoginModal() {
    this.dialogRef = this.dialog.open(this.loginFormTemplate);
    this.dialogRef.disableClose = true;
  }

  hideLoginModal() {
    this.dialogRef.close();
  }

  signIn() {
    this.sasService.login(this.userName, this.password).then((success: any) => {
      if (success) {
        this.hideLoginModal();
      } else {
        alert("Wrong username or password, please try again.");
      }
    });
  }
}

import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { StateService } from '../../state.service';
import { SasService } from '../../sas.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  userName = '';
  password = '';

  constructor(
    public stateService: StateService,
    public sasService: SasService
    ) {}

  ngOnInit() {
    
  }

  signIn() {
    this.sasService.login(this.userName, this.password).then((success: any) => {
      if (success) {
        window.location.reload();
      } else {
        alert("Wrong username or password, please try again.");
      }
    });
  }
}

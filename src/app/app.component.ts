import { Component, OnInit, OnDestroy } from '@angular/core';
import { StateService } from './state.service';
import { Subscription } from 'rxjs';
import { SasService } from './sas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isLoggedIn$ = this.stateService.isUserLoggedIn;
  public requestModal: boolean = false;

  constructor(
    private stateService: StateService,
    private sasService: SasService
    ) {
      sasService.fetchStartupData();
  }

  public logout() {
    this.sasService.logout();
  }
}

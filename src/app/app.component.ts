import { Component, OnInit, OnDestroy } from '@angular/core';
import { StateService } from './state.service';
import { Subscription } from 'rxjs';
import { SasService } from './sas.service';

import { SASjsConfig } from 'sasjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isLoggedIn$ = this.stateService.isUserLoggedIn;
  public requestModal: boolean = false;
  public sasjsConfig: SASjsConfig

  constructor(
    private stateService: StateService,
    private sasService: SasService
    ) {
      sasService.fetchStartupData();
  }

  ngOnInit() {
    this.getSasjsConfig();
  }

  public debugChanged() {
    this.sasService.setDebugState(this.sasjsConfig.debug);
    this.getSasjsConfig();
  }

  public getSasjsConfig() {
    this.sasjsConfig = this.sasService.getSasjsConfig();
  }

  public logout() {
    this.sasService.logout();
  }
}

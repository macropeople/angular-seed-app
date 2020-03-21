import { Component, OnInit } from '@angular/core';
import { StateService } from './state.service';
import { SasService } from './sas.service';

import { SASjsConfig } from 'sasjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isLoggedIn: boolean = true;
  public requestModal: boolean = false;
  public sasjsConfig: SASjsConfig | undefined;

  constructor(
    private stateService: StateService,
    private sasService: SasService
    ) {
      sasService.fetchStartupData();
  }

  ngOnInit() {
    this.getSasjsConfig();

    this.stateService.isUserLoggedIn.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  public debugChanged() {
    if (this.sasjsConfig) {
      this.sasService.setDebugState(this.sasjsConfig.debug);
      this.getSasjsConfig();
    }
  }

  public getSasjsConfig() {
    this.sasjsConfig = this.sasService.getSasjsConfig();
  }

  public logout() {
    this.sasService.logout();
  }
}

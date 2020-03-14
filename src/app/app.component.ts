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
  isLoggedIn$ = this.stateService.isUserLoggedIn;
  constructor(
    private stateService: StateService,
    private sasService: SasService
    ) {
      sasService.fetchStartupData();
    }
}

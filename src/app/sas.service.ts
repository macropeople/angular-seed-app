import { Injectable } from '@angular/core';

import SASjs, { SASjsConfig } from 'sasjs';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class SasService {
  private _sasService: any;

  constructor(
    private stateService: StateService
  ) {
    this._sasService = new SASjs({
      serverUrl: "",
      port: null,
      pathSAS9: "/SASStoredProcess/do",
      pathSASViya: "/SASJobExecution",
      appLoc: "/Public/app",
      serverType: "SAS9",
      debug: true
    });
  }

  public fetchStartupData() {
    this.request("common/appInit", null).then((response: any) => {
      console.log(response);
      this.stateService.setStartupData(response.areas);
    });
  }

  public request(url: string, data: any) {
    return new Promise((resolve, reject) => {
      this._sasService.request(url, data).then((res: any) => {
        if (res.login === false) {
          this.stateService.setIsLoggedIn(false);
          reject(false);
        }
        resolve(res);
      }, (err: any) => {
        if (err) this.stateService.setIsLoggedIn(false);
        reject(err);
      });
    });
  }

  public async login(username: string, password: string) {
    return this._sasService
    .logIn(username, password)
    .then(
      (res: { isLoggedIn: boolean; userName: string }) => {
        console.log(res);
        this.stateService.setIsLoggedIn(res.isLoggedIn);
        return res.isLoggedIn;
      },
      err => {
        console.error(err);
        this.stateService.setIsLoggedIn(false);
        return false;
      }
    )
    .catch(e => {
      if (e === 403) {
        console.error("Invalid host");
      }
      return false;
    });
  }

  public logout() {
    this._sasService.logOut().then(() => {
      this.stateService.setIsLoggedIn(false);
    })
  }

  public getSasjsConfig() {
    return this._sasService.getSasjsConfig();
  }

  public getSasRequests() {
    return this._sasService.getSasRequests();
  }

  public setDebugState(state: boolean) {
    this._sasService.setDebugState(state);
  }
}

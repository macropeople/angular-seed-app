import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AppState {
  isUserLoggedIn: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private isUserLoggedIn$ = new BehaviorSubject(false);
  public isUserLoggedIn = this.isUserLoggedIn$.asObservable();

  public setIsLoggedIn(value: boolean) {
    this.isUserLoggedIn$.next(value);
  }
}

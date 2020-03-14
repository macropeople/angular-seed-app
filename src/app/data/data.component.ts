import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { SasService } from '../sas.service';
import { SpringModel } from '../models/SpringModel';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  public areas = this.stateService.startupData;
  public selectedArea: any;
  public springs: SpringModel[] = [];
  public springsLoading: boolean = false;

  public displayedColumns: string[] = ['LATITUDE', 'LONGITUDE', 'NAME', 'AREA', 'TYPE', 'FARENHEIT', 'CELSIUS'];
  
  constructor(
    private stateService: StateService,
    private sasService: SasService
  ) { }

  ngOnInit(): void {
  }

  public submitData() {
    this.springsLoading = true;
    let data = {areas: [{ area: this.selectedArea }]};

    this.sasService.request("/common/getData", data).then(res => {
      this.springs = res['springs'];
      this.springsLoading = false;
    });
  }
}

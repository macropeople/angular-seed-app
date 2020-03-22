import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SasService } from '../../sas.service';
import * as moment from 'moment';

@Component({
  selector: 'app-requests-modal',
  templateUrl: './requests-modal.component.html',
  styleUrls: ['./requests-modal.component.scss']
})
export class RequestsModalComponent implements OnInit {
  private _opened: boolean = false;
  get opened(): boolean {
    return this._opened;
  }
  @Input()
  set opened(value: boolean) {
    this._opened = value;
    if (value) this.modalOpened();
  }

  @Output() openedChange = new EventEmitter();

  public sasLogActive: boolean = true;
  public sasSourceCodeActive: boolean = false;
  public sasGeneratedCodeActive: boolean = false;
  public tablesActive: boolean = false;

  public sasjsConfig: any;
  public sasjsRequests: any;
  public workTables: any;

  constructor(private sasService: SasService) {
    
  }

  ngOnInit(): void {}

  public parseLogTimestamp(timestamp: any) {
    return `${this.formatTimestamp(timestamp)} ${this.timestampFromNow(timestamp)}`
  }

  public formatTimestamp(timestamp: any) {
    return moment(timestamp).format
    ? moment(timestamp).format('dddd, MMMM Do YYYY, h:mm:ss a')
    : timestamp;
  }

  public timestampFromNow(timestamp: any) {
    return moment(timestamp).format
    ? ` (${moment(timestamp).fromNow()})`
    : '';
  }

  public modalOpenChange(state: any) {
    this.opened = state;
    this.openedChange.emit(this.opened);
  }

  public modalOpened() {
    this.sasjsConfig = this.sasService.getSasjsConfig();
    this.sasjsRequests = this.sasService.getSasRequests();
  }
}

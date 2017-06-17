import { Component, OnInit } from '@angular/core';

import { Error } from '../shared/models/error.model';
import { ErrorService } from '../shared/services/error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  error: Error;

  modalActive:boolean = false;

  constructor( private errorService: ErrorService) {}

  modalClose() {
    this.modalActive = false;
  }

  ngOnInit() {
    this.errorService.errorOccured
      .subscribe(
        (error: Error) => {
          this.error = error;
          this.modalActive = true; //Show modal and trigger animations 
        }
      );
  }
}

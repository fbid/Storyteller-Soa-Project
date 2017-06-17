import { Injectable, EventEmitter } from '@angular/core';

import { Error } from '../models/error.model';

@Injectable()
export class ErrorService {

  errorOccured = new EventEmitter<Error>();

  handleError(error: any) {
    //console.log(error);
    const errorData = new Error(error.title, error.error.message);
    this.errorOccured.emit(errorData);
  }

}

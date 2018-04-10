import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../../../environments/environment';

@Injectable()

export class ConfigurationService {

  constructor() { }

  getAPIUrl(){
      //return "http://localhost:3030/";
      return environment.apiurl;
  }

}
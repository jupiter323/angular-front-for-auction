import { Component, Renderer2, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http } from '@angular/http';
import { ConfigurationService } from '../../shared/services/configs/configs.service';
import { HttpClient } from '@angular/common/http';

import * as $ from 'jquery';
// import { flatten } from '@angular/router';
// import { setFlagsFromString } from 'v8';
//import 'owlcarousel';

@Component({
  selector: '',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ConfigurationService]
})
export class HomeComponent implements OnInit {
  title = 'app';
  carsResults = [];
  isSearchData = false;
  styleSelected = false;
  yearSleceted = false;
  allmakes: any = [{ name: "Any Make" }];
  models: any = [{ name: 'Any Model' }];
  year: any;
  styles: any = [{ name: 'Any Style' }];
  make: any;
  model: any;
  style: any;


  detailInfo: any;

  apiImageUrl = this.config.getAPIUrl() + 'uploads/logos/';
  constructor(private renderer: Renderer2, private http: HttpClient, private config: ConfigurationService) {
    this.renderer.addClass(document.body, 'absolute-nav');
  }

  ngOnInit() {
    let self = this;
    self.http.get(self.config.getAPIUrl() + "car/makes").subscribe(makes => {

      Array.prototype.push.apply(self.allmakes, makes);
      console.log("makes", self.allmakes)

    }, error => {
      console.log(error, "error occured");
    })
  }

  ngAfterViewInit() {
    //$(".b-slider").owlCarousel();
  }
  onSearchChange(val) {
    let self = this;
    if (val == '') {
      self.isSearchData = false;
    }
    else {
      let qry = encodeURIComponent(val);
      self.http.get(self.config.getAPIUrl() + 'car/search/' + qry).subscribe(cars => {
        console.log(cars, "cars");
        self.isSearchData = true;
        self.carsResults = cars['data'];
      }, error => {
        console.log(error, "Error in car search");
      });
    }
  }
  selectedMake(val) {
    let self = this;
    self.make = val;
    this.styleSelected = false;
    self.models = [{ name: 'Any Model' }];
    self.http.get(self.config.getAPIUrl() + 'car/model/' + self.allmakes[val].make_id).subscribe(models => {

      Array.prototype.push.apply(self.models, models);

    }, error => {
      console.log(error, "Model search error");
    })

  }
  selectedModel(val) {
    let self = this;
    self.model = val;
    this.styleSelected = false;
    self.styles = [{ name: 'Any Style' }];
    let _styles = JSON.parse(self.models[val].jsonContent)["S:Envelope"]["S:Body"]["0"].VehicleDescription["0"].style;
    for (let _style of _styles) {
      self.styles.push(_style.$);
    }
  }
  selectedYear(val) {
    this.year = val;
    if (val != '0') this.yearSleceted = true;
    else
      this.yearSleceted = false;
    this.detailInfo = { modelYear: this.year, makeName: this.allmakes[this.make].name, modelName: this.models[this.model].name, styleName: this.styles[val].name, styleId: this.styles[val].id }
  }
  selectedStyle(val) {
    if (val != '0')
      this.styleSelected = true;
    else
      this.styleSelected = false;
    this.detailInfo = { modelYear: this.year, makeName: this.allmakes[this.make].name, modelName: this.models[this.model].name, styleName: this.styles[val].name, styleId: this.styles[val].id }
    console.log(this.detailInfo);


  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'absolute-nav');
  }
}

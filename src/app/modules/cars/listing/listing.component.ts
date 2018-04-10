import { Component, Renderer2, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from '../../../shared/services/configs/configs.service';
import { HelperService } from '../../../shared/services/helper/helper.service';
import { CarService } from '../../../shared/services/car/car.service';
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: '',
  templateUrl: 'listing.component.html',
  providers: [ConfigurationService],
  styleUrls: ['./listing.component.css'],
})
export class CarsListingComponent implements OnDestroy {
  title = 'app';
  searchListings: any = [];  // style list with specified model
  modelInfo: any = [];   // model description
  makeData: any = {};
  modalRef: BsModalRef;
  apiImageUrl = this.config.getAPIUrl() + 'uploads/logos/';
  allmakes: Object = [];
  selectedModels: any = [];
  carsImages = ['aston.jpg', 'audi.jpg', 'jaguar.jpg', 'mers.jpg'];
  search: any = {};
  constructor(private renderer: Renderer2, private route: ActivatedRoute, private router: Router, private http: HttpClient, private config: ConfigurationService, private car: CarService, private modalService: BsModalService, private helper: HelperService) {
    this.renderer.addClass(document.body, 'm-listTable');
    this.helper.showLoader();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  doSearch() {
    let self = this;
    this.modalRef.hide();
    self.router.navigate(['cars/listing'], { queryParams: { make: self.search.make } });
  }

  selectDetails(attr, data) {
    let self = this;
    if (attr == 'make') {
      self.http.get(self.config.getAPIUrl() + "car/makes/models/" + data).subscribe(models => {
        self.selectedModels = models;
        console.log(models, "models");
      }, error => {
        console.log(error, "error occured");
      });
    }
  }

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  ngOnInit() {
    let self = this;

    // let request = 'car/makes/details/' + modelYear + "/" + makeName + "/" + modelName + "/" + styleName;
    self.http.get(self.config.getAPIUrl() + "car/makes").subscribe(makes => {
      self.allmakes = makes;
    }, error => {
      console.log(error, "error occured");
    })
    this.route
      .queryParams
      .subscribe(params => {
        console.log("params :" + JSON.stringify(params));
        if (this.isEmpty(params))
          console.log("nothing")
        else {

          // Defaults to 0 if no query param provided.

          self.helper.hideLoader();
          console.log("style listings");
          let listings;
          listings = self.car.getSelectedModelData();
          if (listings) {
            var vehicleDesc = listings['S:Envelope']['S:Body'][0]['VehicleDescription'];
            self.car.setCarDescription(vehicleDesc);
            self.searchListings = vehicleDesc[0]['style'];
            self.modelInfo = vehicleDesc[0]['$'];
            console.log(self.searchListings);
          } else {
            listings = self.getListings()

          }







          self.http.get(self.config.getAPIUrl() + 'car/make/' + params.make).subscribe(makeData => {
            self.makeData = makeData;
          }, error => {
            console.log("error occured while getting listing");
          })
        }

      });
  }
  getListings() {
    let self = this;
    this.route
      .queryParams
      .subscribe(params => {
        console.log("params :" + JSON.stringify(params));
        if (this.isEmpty(params))
          console.log("nothing")
        else {
          self.http.get(self.config.getAPIUrl() + 'car/model/details/' + params.model).subscribe(modelData => {
            console.log(modelData);
            var vehicleDesc = JSON.parse(modelData[0]['jsonContent'])['S:Envelope']['S:Body'][0]['VehicleDescription'];
            self.car.setCarDescription(vehicleDesc);
            self.searchListings = vehicleDesc[0]['style'];
            self.modelInfo = vehicleDesc[0]['$'];
            console.log(self.searchListings);


          }, error => {
            console.log("error occured while getting listing");
          })
        }
      })

  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'm-listTable');
  }
}

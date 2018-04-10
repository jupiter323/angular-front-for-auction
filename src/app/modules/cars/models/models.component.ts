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
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css'],
  providers: [ConfigurationService],
})
export class ModelsComponent implements OnInit {
  title = 'app';
  searchListings: any = [];  // style list with specified model
  modelInfo: any = [];   // model description
  makeData: any = {};
  modalRef: BsModalRef;
  apiImageUrl = this.config.getAPIUrl() + 'uploads/logos/';
  allmakes: Object = [];
  selectedModels: any = [];
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
    self.router.navigate(['cars/models'], { queryParams: { make: self.search.make } });
  }
  goListing(model: any) {
    let self = this;
    self.car.setSelectedModelData(model);
    self.router.navigate(['cars/listing'], { queryParams: { model: model.model_id } });

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
          self.http.get(self.config.getAPIUrl() + 'car/make/' + params.make).subscribe(makeData => {
            self.makeData = makeData;
            console.log("make data: ", makeData)
          },
            error => {
              console.log("error occured while getting listing");
            })

          // Defaults to 0 if no query param provided.

          self.http.get(self.config.getAPIUrl() + 'car/makes/models/' + params.make).subscribe(listings => {
            console.log("model listings");

            self.helper.hideLoader();

            self.searchListings = listings;
            for (let model of Object(listings)) {

              self.modelInfo.push(JSON.parse(model.jsonContent));
              


            }
            console.log(self.modelInfo["0"]);
            console.log(self.searchListings);
          },
            error => {
              console.log("error occured while getting listing");
              self.helper.hideLoader();
            })


        }

      });
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'm-listTable');
  }
}

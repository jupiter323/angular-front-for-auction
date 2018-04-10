import { Component, Renderer2, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationService } from '../../../shared/services/configs/configs.service';
import { HelperService } from '../../../shared/services/helper/helper.service';
import { CarService } from '../../../shared/services/car/car.service';
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as $ from 'jquery';
import * as toastr from 'toastr';
import 'block-ui';

@Component({
  selector: '',
  templateUrl: 'details.component.html',
  providers: [ConfigurationService],
  styleUrls: ['./details.component.scss'],
})
export class CarsDetailsComponent implements OnDestroy {

  modalRef: BsModalRef;
  title = 'app';
  carDetails: any = {};
  engineDetails: any = {};
  galleryDetails: any = {};
  mainImgUrl;
  selectedGallery = 0;
  relatedModels: any = [];
  apiImageUrl = this.config.getAPIUrl() + 'uploads/logos/';
  newEnquiry: any = {};
  currentModelId: any = false;
  showSuccess: any = false;
  selectedListingId: any = false;
  fullDetail: any = {}
  constructor(private renderer: Renderer2, private route: ActivatedRoute, private router: Router, private http: HttpClient, private config: ConfigurationService, private car: CarService, private modalService: BsModalService, private helper: HelperService) {
    this.renderer.addClass(document.body, 'm-detail');
    this.helper.showLoader();
  }

  pupupFun() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }




  galleryClick(index) {
    this.mainImgUrl = this.galleryDetails['view'][index]['@href'];
    this.selectedGallery = index;

  }


  openModal(template: TemplateRef<any>, listingId) {
    let self = this;
    self.selectedListingId = listingId;
    self.newEnquiry = {};
    this.modalRef = this.modalService.show(template);
  }

  doEnquiry(data) {
    let self = this;
    let newEnquiryData = {
      listing_id: self.selectedListingId,
      first_name: data.value.firstname,
      last_name: data.value.lastname,
      email: data.value.email,
      phone: data.value.phone,
      messsage: data.value.messsage
    }
    self.helper.showLoader();
    self.http.post(self.config.getAPIUrl() + 'enquiry/new', newEnquiryData).subscribe(enquiry_data => {
      self.helper.showMessage("success", "Enquiry have been submitted successfully. Dealer will get back to you soon .");
      //self.helper.hideLoader();
    },
      error => {
        self.helper.showMessage("error", "Error in submitting enquiry!!");
        self.helper.hideLoader();
      })
  }

  ngOnInit() {

    let self = this;
    this.route
      .queryParams
      .subscribe(params => {
        console.log("init detail")
        self.http.get(self.config.getAPIUrl() + 'enquiry/list').subscribe(enquiries => {
          console.log(enquiries, "enquiries");
        });
        //self.helper.hideLoader();

        //let carDesc = self.car.getCarDescription();                

        //let modelIdx = params.modelIdx;

        let modelYear = params.modelYear;
        let makeName = params.makeName;
        let modelName = params.modelName;
        let styleName = params.styleName;
        let styleId = params.styleId;


        let request = 'car/makes/details/' + modelYear + "/" + makeName + "/" + modelName + "/" + encodeURIComponent(styleName);
        console.log(request)
        self.http.get(self.config.getAPIUrl() + request).subscribe(listings => {
          // self.http.get(self.config.getAPIUrl()+ 'car/model/details/'+params.model ).subscribe(details=>{        
          //self.carDetails = details;          
          let carDesc = listings['S:Envelope']['S:Body'][0]['VehicleDescription'][0];
          self.fullDetail = listings;
          //self.carDetails = listings['S:Envelope']['S:Body'][0]['VehicleDescription'][0];           

          self.engineDetails = self.carDetails['engine'];

          self.carDetails.style = carDesc['$'].bestStyleName;
          self.carDetails.make = carDesc['$'].bestMakeName;
          self.carDetails.model = carDesc['$'].bestModelName;
          self.carDetails.price = carDesc['basePrice'][0]['msrp'][0]['$'];
          self.carDetails.bodystyle = carDesc['style'][0]['bodyType'][0]['_'];
          self.carDetails.mpg = carDesc['engine'][0]['fuelEconomy'][0]['city'][0]['$'].low + "~" + carDesc['engine'][0]['fuelEconomy'][0]['hwy'][0]['$'].high;
          self.carDetails.engine = carDesc['engine'][0]['engineType'][0]['_'];
          self.carDetails.drivetrain = carDesc['style'][0]['$'].drivetrain;
          self.carDetails.transmission = carDesc['standard'][1]['description']['0'].replace("Transmission: ", "");
          self.carDetails.trim = carDesc.style["0"].$.trim ? carDesc.style["0"].$.trim : null;

          console.log("carDetails");
          console.log(listings);
          console.log(self.carDetails);



          /* self.http.get(self.config.getAPIUrl()+ 'car/model/related/'+params.model ).subscribe(related_models=>{
            self.relatedModels = related_models;                
          }, 
          error=>{
            //console.log("error occured while getting listing");
            self.helper.hideLoader();
          }) */
        },
          error => {
            console.log("error occured while getting listing");
            self.helper.hideLoader();
          })

        self.http.get(self.config.getAPIUrl() + 'car/makes/details/gallery_data/' + params.styleId).subscribe((details: any) => {
          self.galleryDetails = details;
          console.log("galleryDetails");
          console.log(self.galleryDetails);
          // get the 640 * 480 transparent front 3/4 image          
          if (details.view) {

            let index = details.view.findIndex(x => x['@width'] == "640" && x['@height'] == "480" && x['@shotCode'] == "01" && x['@backgroundDescription'] == "Transparent");
            // let index = 0
            self.mainImgUrl = details.view[index]['@href'];
            this.selectedGallery = index;

            console.log(details.view[index]['@href']);
          }
          self.helper.hideLoader();
        },
          error => {
            //console.log("error occured while getting listing");
            self.helper.hideLoader();
          })


      });
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'm-detail');
  }
}



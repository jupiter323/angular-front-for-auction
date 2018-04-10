import { Component , Renderer2, OnDestroy, AfterViewInit, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from "@angular/common/http";
import * as $ from 'jquery';
import * as toastr from 'toastr';
import 'block-ui';
import { ConfigurationService } from '../../../shared/services/configs/configs.service';
declare var localStorage : any;

@Component({
  selector: '',
  templateUrl: 'submit-car.component.html'  ,
  providers: [ConfigurationService]
})

//API for cars make and and their models
//https://vpic.nhtsa.dot.gov/api/

export class DealerSubmitCarComponent implements OnDestroy {
 
  title = 'app';
  dealer:any = {};
  loginMsg:any = false;
  car:any = {};
  selectedModels:any = [];
  activeStep = 1 ;
  allmakes : Object = [];
  loggedInUser: any = {};
  carSuccess = false;

  constructor(private renderer : Renderer2, private http: HttpClient, private config: ConfigurationService){
    this.renderer.addClass(document.body, 'm-submit1');
    if(localStorage.getItem('user')){
      this.loggedInUser = JSON.parse(localStorage.getItem('user'));
    }
  }

  nextTab(){

  }

  loadListings(){
    
  }

  ngOnInit(){
    let self = this;
    self.http.get(self.config.getAPIUrl()+ "car/makes").subscribe(makes=>{
        self.allmakes = makes;
    },error=>{
        console.log(error, "error occured");
    })
  }

  ngAfterViewInit(){
    //toastr.info('Are you the 6 fingered man?');
    //$.blockUI();
  }

  submitCar(data){
    console.log(data , "data after submit car");
    let self = this;
    data = data.value;
    //self.carSuccess = true;
    let newListing : any  = {
        model_id : data.selectModels,
        dealer_id : self.loggedInUser._id,
        miles_per_year : data.milesPerYear,
        term_of_lease : data.leaseTerm,
        money_down : data.leaseSigningDue,
        color : data.carColor ? data.carColor : 'all',
        vin_number: data.carVIN,        
        monthly_lease_price: data.leaseMonthlyPayment        
    };
    console.log(newListing , "newListing");
    $.blockUI();
    self.http.post(self.config.getAPIUrl()+ 'listing/new', newListing).subscribe(data=>{
      console.log(data, "Listing saved") ;
      $.unblockUI();
      toastr.success('Car submitted successfully!!');
    }, error=>{
      $.unblockUI();
      toastr.error("Error in submitting car");
      console.log(error, "Error in saving listing");
    })

  }

  selectDetails(attr,data){
    let self = this ;
    if(attr == 'make'){
      self.http.get(self.config.getAPIUrl()+ "car/makes/models/"+data).subscribe(models=>{
          self.selectedModels = models;
          console.log(models, "models");
      },error=>{
          console.log(error, "error occured");
      });
    }
  }

  ngOnDestroy(){
    this.renderer.removeClass(document.body, 'm-submit1');
  }

}

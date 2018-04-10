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
  templateUrl: 'upload-image.component.html'  ,
  providers: [ConfigurationService]
})

//API for cars make and and their models
//https://vpic.nhtsa.dot.gov/api/

export class UploadCarImageComponent implements OnDestroy {
 
  title = 'app';
  dealer:any = {};
  loginMsg:any = false;
  car:any = {};
  selectedModels:any = [];
  activeStep = 1 ;
  allmakes : Object = [];
  //loggedInUser = JSON.parse(localStorage.getItem('user'));
  carSuccess = false;

  constructor(private renderer : Renderer2, private http: HttpClient, private config: ConfigurationService){
  	this.renderer.addClass(document.body, 'm-submit1');
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

  uploadImage(data){
    let self = this;
    //self.carSuccess = true;
    $.blockUI();
    self.http.post(self.config.getAPIUrl()+ "car/upload_model_image/"+data.value.selectModels,{image_url : data.value.image_url}).subscribe(result=>{
          $.unblockUI();
          toastr.success('Image uploaded succesfully');
          console.log(result, "models");
      },error=>{
          $.unblockUI();
          console.log(error, "error occured");
      });
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

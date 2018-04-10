import { Component , Renderer2, OnDestroy, AfterViewInit, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from "@angular/common/http";
import { HelperService } from '../../../shared/services/helper/helper.service';
import * as $ from 'jquery';
import * as toastr from 'toastr';
import 'block-ui';
import { ConfigurationService } from '../../../shared/services/configs/configs.service';

declare var localStorage : any;

@Component({
  selector: '',
  templateUrl: 'upload-make-logo.html'  ,
  providers: [ConfigurationService]
})

//API for cars make and and their models
//https://vpic.nhtsa.dot.gov/api/

export class UploadMakeLogoComponent implements OnDestroy {
 
  title = 'app';
  car:any = {make : ""};
  allmakes : Object = [];
  //loggedInUser = JSON.parse(localStorage.getItem('user'));
  carSuccess = false;

  constructor(private renderer : Renderer2, private http: HttpClient, private config: ConfigurationService, private helper: HelperService){
  	this.renderer.addClass(document.body, 'm-submit1');
  }

  
  ngOnInit(){
    let self = this;
    self.helper.showLoader();
    self.http.get(self.config.getAPIUrl()+ "car/makes").subscribe(makes=>{
        self.allmakes = makes;
        self.helper.hideLoader();
    },error=>{
        self.helper.showMessage("error", "Error in loading");        
    })
  }

  uploadLogo(data){
    let self = this;
    self.helper.showLoader();
    self.http.post(self.config.getAPIUrl()+ "car/upload_make_logo/"+data.value.selectMakeId,{image_url : data.value.image_url}).subscribe(result=>{
            self.helper.hideLoader();
            toastr.success('Image uploaded succesfully');
      },error=>{
            self.helper.hideLoader();
            self.helper.showMessage("error", "Error in uplaoding image");        
      });
  }

  ngOnDestroy(){
    this.renderer.removeClass(document.body, 'm-submit1');
  }
  
}

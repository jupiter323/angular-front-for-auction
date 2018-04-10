import { Component , Renderer2, OnDestroy } from '@angular/core';
//import { Http } from '@angular/http';
import { HttpClient } from "@angular/common/http";
import { ConfigurationService } from '../../../shared/services/configs/configs.service';
import * as $ from 'jquery';
import * as toastr from 'toastr';
import 'block-ui';
@Component({
  selector: '',
  templateUrl: 'signup.component.html',
  providers:[ConfigurationService]
})

export class UserSignupComponent {
  title = 'app';
  customer:any = {};
  signupsMsg:any = false;

  constructor(private renderer : Renderer2, private http: HttpClient, private config: ConfigurationService){
    
  }

  customerSignup(data){
    
    data = data.value;
    let self = this;

    $.blockUI({css:{backgroundColor : 'none', border: 'none'},message : $("<img src='/assets/images/logo/loader.gif'>")});

    self.customer = {
      first_name : data.firstname,
      last_name : data.lastname,
      email : data.email,
      password : data.password,
      mobile_no : data.mobile_no      
    }   

    self.http.post(self.config.getAPIUrl()+"user/signup", self.customer ).subscribe(response => {
      //self.signupsMsg = {error: false, message : };
      $.unblockUI();
      toastr.success("Customer signup successfull !!!");
      self.customer = {};
    },error=>{
      //self.signupsMsg = {error: true , message : "Error in signup as customer. Please try again"};
      toastr.error("Error in user signup. Please check the validation or try again later");
      $.unblockUI();
    });    
  }
}

import { Component , Renderer2, OnDestroy } from '@angular/core';
//import { Http } from '@angular/http';
import { HttpClient } from "@angular/common/http";
import { ConfigurationService } from '../../../shared/services/configs/configs.service';
import * as $ from 'jquery';

@Component({
  selector: '',
  templateUrl: 'register.component.html',
  providers:[ConfigurationService]
})

export class DealerSignupComponent {
  title = 'app';
  dealer:any = {};
  signupsMsg:any = false;

  constructor(private renderer : Renderer2, private http: HttpClient, private config: ConfigurationService){
    //this.renderer.addClass(document.body, 'm-detail');
    /*$(document).ready(function(){
         console.log("okkkkkkk");
    });*/
  }

  dealerSignup(data){
    
    data = data.value;
    let self = this;

    self.dealer = {
      first_name : data.firstname,
      last_name : data.lastname,
      email : data.email,
      password : data.password,
      businessname : data.businessname,
      mobile_no : data.mobile_no      
    }   

    self.http.post(self.config.getAPIUrl()+"dealer/signup", self.dealer ).subscribe(response => {
      self.signupsMsg = {error: false , message : "Dealer signup successfully"};
    },error=>{
      self.signupsMsg = {error: true , message : "Error in signup as dealer. Please try again"};
    });    
  }

//   ngOnDestroy(){
//     this.renderer.removeClass(document.body, 'm-detail');
//   }
}

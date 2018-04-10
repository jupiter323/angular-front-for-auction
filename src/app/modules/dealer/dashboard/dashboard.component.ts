import { Component , Renderer2, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import * as $ from 'jquery';

declare var localStorage  : any;

@Component({
  selector: '',
  templateUrl: 'dashboard.component.html'  
})

export class DealerDashboardComponent {
 
  title = 'app';
  dealer:any = {};
  loginMsg:any = false;

  constructor(private renderer : Renderer2, private http: Http){
  	//localStorage.setItem('dealer', 'test');
    //this.renderer.addClass(document.body, 'm-detail');
    /*$(document).ready(function(){
         console.log("okkkkkkk");
    });*/
  }

  loadListings(){
    
  }

  dealerLogin(data) {
    data = data.value; 
    let self = this;
    self.dealer = {      
      email : data.email,
      password : data.password ,
    }    
    self.http.post("http://localhost:3000/dealer/login", self.dealer ).subscribe(response => {      
      let loginData = response.json();      
      console.log(loginData, "loginData");
      if(!loginData.error){
      	self.loginMsg = {error: false, message:"Login Successfull. Redirecting to dashboard" };
      	localStorage.setItem('dealertoken', loginData.token);	
      } 
      else{
      	self.loginMsg.error = true;
      	self.loginMsg.message = loginData.message;
      	localStorage.setItem('dealertoken', false);
      }     
    },error=>{
      self.loginMsg = error.json() ;
    });    
  }

  //   ngOnDestroy(){
  //     this.renderer.removeClass(document.body, 'm-detail');
  //   }

}

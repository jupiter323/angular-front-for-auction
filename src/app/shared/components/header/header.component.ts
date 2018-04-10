import { Component, OnInit, Renderer2 } from '@angular/core';
import { UserService } from "../../services/user/user.service";
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import * as toastr from 'toastr';
import * as $ from 'jquery';

declare var localStorage  : any;

@Component({
  selector: 'cars-header',
  templateUrl: 'header.component.html',
  providers:[]  
})

export class CarsHeaderComponent implements OnInit {
  title = 'app';
  loggedInUser:any= {};

  constructor(private userService : UserService, private router : Router, private route: ActivatedRoute, private renderer : Renderer2){

    /*let allowedUrl = (this.router.url.indexOf("dealer/signup") == -1 && this.router.url.indexOf("dealer/login") == -1);
    if(allowedUrl && !this.loggedInUser.email){
      this.router.navigate(['/dealer/login']);
    }*/

    let self = this;
    self.userService.getUpdatedUser().subscribe(user=>{
      self.loggedInUser = JSON.parse(user);
    });

    if(localStorage.getItem('user')){
      self.loggedInUser = JSON.parse(localStorage.getItem('user'));
    }

  }

  doLogout(){
    let self = this;    
    localStorage.clear();
    self.loggedInUser = false;
    toastr.success("You have logged out successfully. Redirecting to login page.");
    setTimeout(function(){
      self.router.navigate(['/user/login']);
    },1300);
  }

  mouseEnter(event){
    this.renderer.addClass(event.srcElement, 'open');
    //$(event.srcElement).addClass("open")
  }

  mouseLeave(event){
    this.renderer.removeClass(event.srcElement, 'open');
  }
  
  ngOnInit(){
      console.log(this.loggedInUser, "Header component OnInit called");
  }

}
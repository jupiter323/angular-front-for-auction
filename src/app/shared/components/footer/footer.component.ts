import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user/user.service";
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';

declare var localStorage  : any;

@Component({
  selector: 'cars-footer',
  templateUrl: 'footer.component.html',
  providers:[]  
})

export class CarsFooterComponent implements OnInit {
  title = 'app';
  //loggedInUser = JSON.parse(localStorage.getItem('user'));
  loggedInUser:any= {};

  constructor(private userService : UserService, private router : Router, private route: ActivatedRoute){
   
  }


  ngOnInit(){
      console.log("Footer component OnInit called");
  }

}
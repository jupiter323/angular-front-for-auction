import { Component , Renderer2, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationService } from '../../../shared/services/configs/configs.service';
import { HelperService } from '../../../shared/services/helper/helper.service';
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: '',
  templateUrl: 'enquiries.component.html',
  providers: [ConfigurationService]  
})
export class EnquiriesComponent implements OnDestroy {

  modalRef: BsModalRef;
  title = 'Enquiries';
  newEnquiry:any = {};
  enquiries: any= [];      
  constructor(private renderer : Renderer2, private route: ActivatedRoute, private router: Router, private http : HttpClient, private config : ConfigurationService, private modalService: BsModalService, private helper : HelperService){
    //this.renderer.addClass(document.body, 'm-detail');
    this.helper.showLoader();
  }
  
  openModal(template: TemplateRef<any>, listingId) {    
    this.modalRef = this.modalService.show(template);
  }

  

  ngOnInit(){    
    let self = this ;
    this.route
      .queryParams
      .subscribe(params => {
        self.helper.showLoader();
        self.http.get(self.config.getAPIUrl()+ 'enquiry/list' ).subscribe(enquiriesResponse=>{
          self.enquiries = enquiriesResponse;          
          self.helper.hideLoader();
        }, 
        error=>{
          self.helper.hideLoader();
          self.helper.showMessage("error", "Error in loading enquiries");
        })        
    });
  }

  ngOnDestroy(){
    //this.renderer.removeClass(document.body, 'm-detail');
  }
}


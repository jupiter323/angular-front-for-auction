import * as $ from 'jquery';
import * as toastr from 'toastr';
import 'block-ui';

export class HelperService {

    constructor() { }

    showLoader(){
        $.blockUI({css:{backgroundColor : 'none', border: 'none'},message : $("<img src='/assets/images/logo/loader.gif'>")});
    }  

    hideLoader(){
        $.unblockUI();
    }

    showMessage(type:string = 'info', message:string){
        toastr[type](message);
    }

}
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

declare var localStorage : any;

@Injectable()
export class UserService {
    subject = new Subject<any>();

    updateUser() {
        let loggedInUser = localStorage.getItem("user");
        this.subject.next(loggedInUser);
    }

    clearMessage() {
        this.subject.next();
    }

    getUpdatedUser(): Observable<any> {
        return this.subject.asObservable();
    }
}
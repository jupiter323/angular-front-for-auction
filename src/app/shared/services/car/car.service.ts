import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CarService {
    private carDescription : any;
    private carModelData : any;

    constructor() {
        this.carDescription = "";
    }

    public setCarDescription(val: any): void {
        this.carDescription = val;
    }
    public setSelectedModelData(val: any): void {
        this.carModelData = JSON.parse(val.jsonContent);
    }

    public getCarDescription(): any {
        return this.carDescription;
    }
    public getSelectedModelData(): void {
        return this.carModelData;
    }
}
import { Time } from '@angular/common';

//import { base_data } from './base_data.model';

export class menu {

    id : number;
    name : string ;
    price : number ;
    preparation : Time;
    image : Blob;

    constructor(id : number =0,name : string = "", price : number = 0, preparation : Time, image : Blob){
       
        this.setId(id);
        this.setName(name) ;
        this.setPrice(price);
        this.setPreparation(preparation);
        this.setImage(image);
    }

    public setId (id : number) {
        this.id = id ;
    }

    public setName (name : string) {
        this.name = name ;
    }

    public setPrice (price : number) {
        this.price = price
    }

    public setPreparation (preparation : Time) {
        this.preparation = preparation ;
    }

    public setImage (image : Blob) {
        this.image = image
    }

    public getId () : number {
        return this.id
    }
    public getName () : string {
        return this.name
    }
    public getPrice () : number {
        return this.price ;
    }

    public getPreparation () : Time {
        return this.preparation
    }

    public getImage () : Blob {
        return this.image ;
    }

}
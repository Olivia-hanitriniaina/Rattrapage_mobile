import { Time } from '@angular/common';

//import { base_data } from './base_data.model';

export class commande {

    id : number;
    menuId : number ;
    quantity : number;
    montant : number;

    constructor(id : number =0, menuId : number = 0, quantity : number = 0, montant : number=0){
       
        this.setId(id);
        this.setMenuId(menuId) ;
        this.setQuantity(quantity);
        this.setMontant(montant);
    }

    public setId (id : number) {
        this.id = id ;
    }

    public setMenuId (menuId : number) {
        this.menuId = menuId ;
    }

    public setQuantity (quantity : number) {
        this.quantity = quantity
    }

    public setMontant (montant : number) {
        this.montant = montant ;
    }

    public getId () : number {
        return this.id
    }
    public getMenuId () : number {
        return this.menuId
    }
    public getQuantity () : number {
        return this.quantity ;
    }

    public getMontant () : number {
        return this.montant
    }
}
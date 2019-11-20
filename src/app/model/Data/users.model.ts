import { Time } from '@angular/common';

//import { base_data } from './base_data.model';

export class users {

    id : number;
    login: string;
    mdp: string;
    active : number;


    constructor(id : number =0, login: string ="",mdp: string ="", active: number){
        this.setId(id);
        this.setLogin(login) ;
        this.setMdp(mdp);
        this.setActive(active);
    }
    public setId (id : number) {
        this.id = id ;
    }

    public setLogin (login : string) {
        this.login = login ;
    }

    public setMdp (mdp : string) {
        this.mdp = mdp;
    }
    public setActive (active : number) {
        this.active = active;
    }

    public getId () : number {
        return this.id;
    }
    public getLogin () : string {
        return this.login;
    }
    public getMdp () : string {
        return this.mdp;
    }
    public getActive () : number {
        return this.active;
    }
}
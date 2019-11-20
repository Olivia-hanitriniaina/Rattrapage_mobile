import { Time } from '@angular/common';

//import { base_data } from './base_data.model';

export class data_synk {

    table_name: string;
    type: string;
    row_id: number;

    constructor(table_name: string ="",type: string ="",row_id: number =0){

    }

    public setTable_name (table_name : string) {
        this.table_name = table_name ;
    }

   
    public getTable_name () : string {
        return this.table_name
    }
    public setType (type : string) {
        this.type = type ;
    }

   
    public getType () : string {
        return this.type
    }
    public setRow_id (row_id : number) {
        this.row_id = row_id ;
    }

   
    public getRow_id () : number {
        return this.row_id
    }

}
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Injectable } from '@angular/core';
import {request_users,request_menu,request_data_synck,request_commande} from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

//import * as pbkdf2_sha512 from 'pbkdf2-sha512';
import { Storage } from '@ionic/storage';

import { users } from '../Data/users.model';
import { menu } from '../Data/menu.model';

import { ToastController } from '@ionic/angular';
import { Base64 } from '@ionic-native/base64/ngx';
import { Base64ToGallery, Base64ToGalleryOptions } from '@ionic-native/base64-to-gallery/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';



@Injectable()
export class Database_manager {
    apiUrl = 'https://s6hotel01.herokuapp.com/index.php/Web_service';
    db: SQLiteObject;
    hasWriteAccess: boolean = false;

    constructor(private androidPermissions: AndroidPermissions, private b64tg: Base64ToGallery, private b64: Base64, private sqlite: SQLite, private storage: Storage, private http: HttpClient, private toastController: ToastController) {

    }

    public setDb(): Promise<any> {
        return this.init_database().then((db: SQLiteObject) => {
            this.db = db;
            console.log('Database initiated...')
        }).catch(e => console.log('setDb exception : ' + e.message));
    }

    public init_database(): Promise<SQLiteObject> {
       
        return this.sqlite.create({
            name: "hotel.db",
            location: 'default'
        })
    }



    init_all_table(): void {
        this.setDb()
            .then(() => {
           
            this.db.executeSql(request_menu, [])
                .then(() => {console.log(request_menu) })
                .catch(e => console.log(e));
            this.db.executeSql(request_commande, [])
                .then(() => { console.log(request_commande)})
                .catch(e => console.log(e));
            this.db.executeSql(request_data_synck, [])
                .then(() => { console.log("atooo"+request_data_synck)})
                .catch(e => console.log(e));
            this.db.executeSql(request_users, [])
                .then(() => {console.log(request_users); })
                .catch(e => console.log(e));
            })
            .catch(e => {
                console.log("Une erreur s'est produite lors de l'initialisation de la base de donnée!");
                console.log(e.message);

            })

    }
    init_table_data() {
        this.init_database().then((db: SQLiteObject) => {

            this.http.get(this.apiUrl).subscribe((data )=> {
                console.log(data);
            });
            this.http.get("../../assets/json/users.test.json").subscribe((data: Array<users>) => {
                let sql_insert: string = "insert into utilisateur (id,login,mdp,active) values (?, ?, ?, ?) ";
                
                for (var i = 0; i < data.length; i++) {
                    db.executeSql(sql_insert, [
                        data[i].id,
                        data[i].login,
                        data[i].mdp,
                        data[i].active,
                    ]).then(() => {
                        console.log("vita le insert 1"+JSON.stringify(data));

                    })
                        .catch(e => {
                            console.log('tena mis olana le izy \n' + JSON.stringify(e));
                        })
                }
            });
            this.http.get("../../assets/json/menu.test.json").subscribe((data: Array<menu>) => {
                let sql_insert: string = "insert into menu_hotel (id,name,price,preparation,image) values (?, ?, ?, ?, ?) ";
                for (var i = 0; i < data.length; i++) {
                    db.executeSql(sql_insert, [
                        data[i].id,
                        data[i].name,
                        data[i].price,
                        data[i].preparation,
                        data[i].image,
                    ]).then(() => {
                        console.log("vita le insert 2"+JSON.stringify(data));

                    })
                        .catch(e => {
                            console.log('Error on insert res_user \n' + JSON.stringify(e));
                        })
                }
            });
        });
    }
    checkLogin(log: string, pass: string): Promise<any> {
        let sql_select: string = "select * from users  where login = ?";
        return this.db.executeSql(sql_select, [log]).then((data) => {
           if (data.rows.length > 0) {

              if (pass == data.rows.item(0).mdp) {
                    return this.db.executeSql("update users set active = 1 where login = ? ", [log]).then(() => {
                        return 1;
                    }).catch(e => {
                        console.log('Error on update \n' + JSON.stringify(e));
                    })
                }
                else return 0;
            }
            else return -1;
        }).catch(e => {
            console.log('Error on select \n' + JSON.stringify(e));
        })

    }
    storage_Login(log: string, pass: string): Promise<any> {
        let sql_select: string = "select * from users where login = ? ";
        return this.db.executeSql(sql_select, [log]).then((data) => {
            if (data.rows.length > 0) {
                if (data.rows.item(0).mdp == pass) {
                    data = data.rows.item(0);
                    return data;
                }
                else return 0;
            }
        }).catch(e => {
            console.log('Error on select \n' + JSON.stringify(e));
        })
    }
    get_data_menu() {
        let data_return = [];
        let sql_select: string = "select * from menu ";
        return this.db.executeSql(sql_select, []).then((data) => {
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    data_return.push(data.rows.item(i));
                }
                console.log(JSON.stringify(data_return))
                return data_return;
            }
        }).catch(e => {
            console.log('Error on select \n' + JSON.stringify(e));
        });
    }
    insert_res_users(name : string, price : number, preparation : string , image: String) {
       
        let sql_insert: string = "insert into menu (name,price,preparation,image) values ('"+name+"', "+price+", '"+preparation+"', '"+image+"') ";
        return this.db.executeSql(sql_insert, [
           
        ]).then(() => {
            console.log("tafa le insert ")
        })
        .catch(e => {
            console.log('Error on insert res_user \n' + JSON.stringify(e));
        })
    } 
    update_meny(name : string, price : number, preparation : string, id:number) {
        let query = " update menu  set name = '"+name+"' , price = "+price+" , preparation = '"+preparation+"' where id = "+id+" ";
        return this.db.executeSql(query, [
        ])
            .then(() => console.log("data updated"))
            .catch(e => console.log(e.message));
    }  
    delete_meny(id : number) {
        let query = " delete from menu where id = "+id+" ";
        console.log(query);
        return this.db.executeSql(query, [])
            .then(() => console.log("data updated"))
            .catch(e => console.log(e.message));
    }      
    get_recherche(value :string) {
        let data_return = [];
        let sql_select: string = "select * from menu where name like '"+value+"' or id like '"+value+"' or preparation like '"+value+"' or price like '"+value+"'";
       
        return this.db.executeSql(sql_select, []).then((data) => {
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    data_return.push(data.rows.item(i));
                }
                console.log(JSON.stringify(data_return))
                return data_return;
            }
        }).catch(e => {
            console.log('Error on select \n' + JSON.stringify(e));
        });
    }
}
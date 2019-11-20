import { HttpHeaders } from '@angular/common/http';

export const environment = {production: false ,};
export const base_url_for_sync = 'http://localhost:3000/' ;
export const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
};

export const request_menu : string = "create table if not exists menu_hotel (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name VARCHAR(300), price double(18,2), preparation time, image blob)" ;
export const request_data_synck : string = "create table if not exists  data_synck (table_name varchar(100) not null,type boolean, row_id integer )";
export const request_commande : string = "create table if not exists commande (Idcommande INT NOT NULL AUTO_INCREMENT primary key,menuId INT NOT NULL references menu_hotel(Idmenu),quantity int,montant double(15,2))";
export const request_users : string = "create table if not exists utilisateur (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, login VARCHAR(300), mdp double(18,2), active INT)" ;


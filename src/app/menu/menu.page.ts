import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from 'primeng/components/common/api';
import { Router,NavigationExtras, ActivatedRoute } from '@angular/router';
import { Database_manager } from '../model/DAO/database_manager.model';
import { ToastController } from '@ionic/angular';
import { MenuItem } from 'primeng/api';
import { FullScreenImage } from '@ionic-native/full-screen-image/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
    selector: 'app-menu',
    templateUrl: 'menu.page.html',
    styleUrls: ['menu.page.scss'],
    providers: [MessageService]
})
export class MenuPage implements OnInit {
    
    data_from_db: any;
    data_storage: any;
    cols: any[];
    itemes: MenuItem[];
    edit: boolean = false;
    display: boolean = false;
    filePath: string;
    photo : String ;
    window: any = window;
    display_2: boolean = false;
    display_5: boolean = false;
    fiche_menu: FormGroup;
    data_db : any;
    detaille : boolean = false;

    constructor(
        private storage : Storage, 
        private activated_route : ActivatedRoute, 
        private toast : ToastController,
        private dbm : Database_manager, 
        private router : Router,
        private camera : Camera,
        private fullScreenImage : FullScreenImage,
        private b64 : Base64,
        private form_builder: FormBuilder) {
        
         }
      
    ionViewWillEnter(){
        console.log("ato");
          this.dbm.get_data_menu()
              .then((data)=>{
                 this.data_from_db = data;
                 console.log("storage"+JSON.stringify(this.data_from_db))
                  this.storage.set('data_p2', JSON.stringify(data)).catch(e => console.log("set storage p2 " + e.message))
                  .then(() => {
                    this.storage.get('data_p2')
                      .then((data: any) => {
                        this.data_storage = JSON.parse(data);
                        console.log("storage"+JSON.stringify(this.data_storage))
                      })
                  })
              }).catch(e => console.log(e.message));
      }

    ngOnInit(): void {

        this.ionViewWillEnter();

        this.itemes = [
            { label: 'Déconnecter', icon: 'pi pi-fw pi-plus' },
          ];

        this.cols = [
            { field: 'id', header: 'product_id', display: 'table-cell', text_align: "left", pointer_events: 'none', bg: '#D3D3D3' },
            { field: 'name', header: 'product_name', display: 'table-cell', text_align: "left", pointer_events: 'initial', bg: '' },
            { field: 'price', header: 'price', display: 'table-cell', text_align: "left", pointer_events: 'initial', bg: '' },
            { field: 'preparation', header: 'preparation', display: 'table-cell', text_align: "right", pointer_events: 'none', bg: '#D3D3D3' },
            { field: 'image', header: 'image', display: 'none', text_align: "right", pointer_events: 'none', bg: '#D3D3D3' },
            
          ];
          this.edit=false;
          this.data_db = this.data_from_db;
        
    }

    validation(){
      this.display_5 = false;
      
    }
      enable_edit() {
      
       if (this.edit == false) {
          this.edit = true;
        }
        else {
          this.edit = false
        }
    }
    ajouter(){
      this.router.navigate(['ajouter_menu']);
    }
    suppresion(a : any){
      
    }
    open_full_screen() {
      this.display_2 = true;
    }
    Annuler(){
      this.edit = false;
      }
    sauvegarder(){
      for(var i = 0; i< this.data_from_db.length; i++){
        this.dbm.update_meny(this.data_from_db[i].name, this.data_from_db[i].price, this.data_from_db[i].preparation, this.data_from_db[i].id)			.then(()=>{
          this.edit = false;
          this.makeToast("mise jour effectuer!");
        }).catch(e=>console.log(e.message))
      }
     
    }
    detail(rowData){
      this.data_db = rowData;
     
      this.detaille = true;
    }
    delete() {
      this.dbm.delete_meny(this.data_db.id).then(()=>{
        this.makeToast("suppresion avec succes !");
      }).catch(e=>console.log(e.message))
      this.detaille = false;
      this.ionViewWillEnter();
    }

    async makeToast(message: string) {
      let x = await this.toast.create({
          message: message,
          duration: 3000
      });
      x.present();
  }
  recherche(a) : void{
    if (a == null){
        this.data_from_db;
    }
    else this.dbm.get_recherche(a).then((data)=>{
      console.log(data);
      this.data_from_db = data
    }).catch(e=>console.log(e.message))
  }
}

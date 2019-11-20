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
    templateUrl: 'ajouter_menu.page.html',
    styleUrls: ['ajouter_menu.page.scss'],
    providers: [MessageService]
})
export class Ajouter_menuPage implements OnInit {
    
    data_from_db: any;
    data_storage: any;
    cols: any[];
    datab: any[];
    itemes: MenuItem[];
    edit: boolean = false;
    display: boolean = false;
    filePath: string;
    photo : String ;
    window: any = window;
    display_2: boolean = false;
    display_5: boolean = false;
    fiche_menu: FormGroup;
     name : string;
     formulaire ={name:"", price:0 ,preparation:""} ;
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
          this.fiche_menu = this.form_builder.group({
            name : '',
            price : '',
            preparation : ''
          })
    
         }
      
    ionViewWillEnter(){}

    ngOnInit(): void {
          this.fiche_menu = this.form_builder.group({});
       }
    async takePicture() {
      let cameraOptions: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        targetHeight: 1024,
        targetWidth: 768,
        cameraDirection: 1,
        correctOrientation: true,
      };
      const imagePath: string = await this.camera.getPicture(cameraOptions);
        if(this.window.Ionic.WebView.convertFileSrc(imagePath).includes("http://localhost/_app_file_/") == true) {
          this.b64.encodeFile( this.window.Ionic.WebView.convertFileSrc(imagePath).replace("http://localhost/_app_file_/", "file:///") ).then(result => {
            console.log(imagePath) ;
            console.log("result" + result) ;
            result = result.split(',')[1] ;
            this.photo = result ;
          }) ;
        }
      return this.window.Ionic.WebView.convertFileSrc(imagePath);
    }
    async showImageFromCamera() {
      try {
        this.filePath = await this.takePicture();
      } catch (error) {
        console.log(error);
      }
    }
    open_full_screen() {
      this.display_2 = true;
    }
    remove_image() {
      this.filePath = null;
    }
    save_new_client(){
      this.datab = [this.formulaire.name, this.formulaire.price, this.formulaire.preparation, this.photo];
      this.dbm.insert_res_users(this.formulaire.name, this.formulaire.price, this.formulaire.preparation, this.photo).then(()=>{
        this.router.navigate(['menu']);
        this.makeToast("ajouter avec succes !");
      }).catch(e=>console.log(e.message))
    }
    retour(){
      this.router.navigate(['menu']);
    }
    async makeToast(message: string) {
      let x = await this.toast.create({
          message: message,
          duration: 3000
      });
      x.present();
  }
}

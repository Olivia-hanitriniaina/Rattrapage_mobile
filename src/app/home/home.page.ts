import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from 'primeng/components/common/api';
import { Router } from '@angular/router';
import { Database_manager } from '../model/DAO/database_manager.model';
import { ToastController } from '@ionic/angular';
import { Ng6OdooRPCService } from 'angular6-odoo-jsonrpc';
import { HttpHeaders } from '@angular/common/http';
import { Platform, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

export class test {
    db: string;
    name: string;
    password: string;
}

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    providers: [MessageService]
})
export class HomePage implements OnInit {

    userFormGroup: FormGroup;
    msgs: Message[] = [];
    err: boolean;
   

    constructor(
        private storage : Storage,
        private formbuilder: FormBuilder,
        private messageService: MessageService,
        private router: Router,
        private dbm: Database_manager,
        private toast: ToastController,
        private loader : LoadingController
    ) {
        this.userFormGroup = this.formbuilder.group({
            "login": ["", Validators.required],
            "password": ["", Validators.required]
        });
    }

    ngOnInit(): void {
    }
    async chargement(){
        let loading = await this.loader.create({
            duration: 6000,
            message: 'chargement',
          });
          loading.present();
          loading.dismiss();
    }
    onSubmit(){
        try {

            this.dbm.checkLogin(this.userFormGroup.get('login').value, this.userFormGroup.get('password').value).then(result => {
                switch (result) {
                    case 0: {
                        this.makeToast("Mot de passe incorrect !");
                        break;
                    }
                    case 1: {
                       
                        this.dbm.storage_Login(this.userFormGroup.get('login').value,this.userFormGroup.get('password').value)
                            .then(data =>{
                                console.log(JSON.stringify(data));
                                this.storage.set('data_p2',JSON.stringify(data)).catch(e => console.log("set storage p2 " + e.message));
                              
                            }).catch(e => console.log('storage login homepage exception : ' + e.message))
                            .then( () => this.router.navigate(['menu']))
                        this.chargement(); 
                        break;
                        
                    }
                    case -1: {
                        this.makeToast("Login incorrect !");
                        break;
                    }
                    case -2: {
                        this.makeToast("Login et mot de passe incorrect !");
                        break;
                    }
                }

            })

        } catch (error) {
            console.log(error.stack);
            console.log(error.message);
        }
    }

    async makeToast(message: string) {
        let x = await this.toast.create({
            message: message,
            duration: 3000
        });
        x.present();
    }

    direct() {
        this.router.navigate(['detail-tournee']);
    }




}

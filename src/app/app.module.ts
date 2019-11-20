import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular'; 
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http' ;
import { Database_manager } from './model/DAO/database_manager.model';
import { Camera } from '@ionic-native/camera/ngx' ;
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FullScreenImage } from '@ionic-native/full-screen-image/ngx' ;

import {FormlyModule} from '@ngx-formly/core';
import {FormlyIonicModule} from '@ngx-formly/ionic'
import { Ng6OdooRPCService } from 'angular6-odoo-jsonrpc';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AES256 } from '@ionic-native/aes-256/ngx';


import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer} from '@ionic-native/file-transfer/ngx';

import { Base64 } from '@ionic-native/base64/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx' ;

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [

  ],
  imports: [
    BrowserModule, 
    Ng2SearchPipeModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule, 
    HttpClientModule,
    LeafletModule.forRoot(),
    IonicStorageModule.forRoot({ 
      name: 'imp_tob',
        driverOrder: ['indexeddb', 'sqlite', 'websql']
    }) ,
    FormlyModule.forRoot(),
    FormlyIonicModule,
  ],
  providers: [
    Database_manager,
    StatusBar,
    SplashScreen,
    SQLite,
    Camera,
    Geolocation ,
    FullScreenImage ,
    Ng6OdooRPCService ,
    AES256 ,

    File, 
    FilePath ,
    FileTransfer ,
    Base64 ,
    Base64ToGallery ,
    AndroidPermissions, 
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

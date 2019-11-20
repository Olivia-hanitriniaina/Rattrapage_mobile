import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';
import { ChartModule } from 'primeng/chart';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextModule } from 'primeng/inputtext';
import { AccordionModule } from 'primeng/accordion';
import { PasswordModule } from 'primeng/password';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { Camera } from '@ionic-native/camera/ngx';
import {MenuModule} from 'primeng/menu';
import {DialogModule} from 'primeng/dialog';
import {OverlayPanelModule} from 'primeng/overlaypanel';



const routes: Routes = [
  {
    path: '',
    component: MenuPage
  }
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ChartModule,
    FullCalendarModule,
    ButtonModule,
    DropdownModule, 
    SidebarModule,
    InputTextModule,
    AccordionModule,
    PasswordModule,
    MessagesModule,
    MessageModule,
    BreadcrumbModule,
    TabViewModule,
    ToastModule,
    TableModule,
    RouterModule.forChild(routes),
    MenuModule,
    DialogModule
    
  ],
  declarations: [MenuPage],
  providers : [Camera, Geolocation, MessageService]
})
export class MenuPageModule {}

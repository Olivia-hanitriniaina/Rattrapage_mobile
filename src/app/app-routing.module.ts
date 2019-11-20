import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',loadChildren: './home/home.module#HomePageModule' },
  { path: 'menu',loadChildren: './menu/menu.module#MenuPageModule' },
  { path: 'ajouter_menu',loadChildren: './ajouter_menu/ajouter_menu.module#Ajouter_menuPageModule' },
/*{ path: 'fiches-client',resolve:{ data : ClientService},  canActivate:[AppGuard],loadChildren: './clients/fiches-client/fiches-client.module#FichesClientPageModule' },
  { path: 'new-client',canActivate:[AppGuard],resolve:{ data : DetailsClientService},loadChildren: './clients/new-client/new-client.module#NewClientPageModule' },
  { path: 'discussion',canActivate:[AppGuard],loadChildren: './discussion/discussion.module#DiscussionPageModule' },
  { path: 'detail-fiche-client',resolve:{ data : DetailsClientService}, canActivate:[AppGuard],loadChildren: './clients/detail-fiche-client/detail-fiche-client.module#DetailFicheClientPageModule' },
  { path: 'liste-tournee',canActivate:[AppGuard],loadChildren: './tournees/liste-tournee/liste-tournee.module#ListeTourneePageModule' },
  { path: 'detail-tournee',canActivate:[AppGuard],loadChildren: './tournees/detail-tournee/detail-tournee.module#DetailTourneePageModule' },
  { path: 'fiche-visite',canActivate:[AppGuard],loadChildren: './fiche-visite/fiche-visite.module#FicheVisitePageModule' },
  { path: 'page-one',canActivate:[AppGuard],loadChildren: './fiche-visite/page-one/page-one.module#PageOnePageModule' },
  { path: 'page-two',canActivate:[AppGuard],loadChildren: './fiche-visite/page-two/page-two.module#PageTwoPageModule' },
  { path: 'page-three',canActivate:[AppGuard],loadChildren: './fiche-visite/page-three/page-three.module#PageThreePageModule' },
  { path: 'page-four',canActivate:[AppGuard],loadChildren: './fiche-visite/page-four/page-four.module#PageFourPageModule' },
  { path: 'page-five',canActivate:[AppGuard],loadChildren: './fiche-visite/page-five/page-five.module#PageFivePageModule' },
  { path: 'page-six',canActivate:[AppGuard],loadChildren: './fiche-visite/page-six/page-six.module#PageSixPageModule' },
  { path: 'page-seven',canActivate:[AppGuard],loadChildren: './fiche-visite/page-seven/page-seven.module#PageSevenPageModule' },
  { path: 'new-fiche-visite',canActivate:[AppGuard],loadChildren: './fiche-visite/new-fiche-visite/new-fiche-visite.module#NewFicheVisitePageModule' },
  { path: 'map',canActivate:[AppGuard],loadChildren: './map/map.module#MapPageModule' },
  { path: 'synchro',canActivate:[AppGuard],resolve:{ data : DataForSyncService },loadChildren: './synchro/synchro.module#SynchroPageModule' },
  { path: 'compte',canActivate:[AppGuard],loadChildren: './compte/compte.module#ComptePageModule' },
  { path: 'imgtest', loadChildren: './imgtest/imgtest.module#ImgtestPageModule' },
*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'usuario', children: [
      { path: 'inicio', loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule) },
   
    ]
  },
  { path: '**', redirectTo: 'home' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

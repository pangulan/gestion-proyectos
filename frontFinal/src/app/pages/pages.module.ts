import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import { PagesRoutingModule } from './pages-routing.module';
import { registerLocaleData } from "@angular/common"
import LocaleEs from "@angular/common/locales/es-CO";
import { DocumentoModule } from '../modules/documento/documento.module';
import { PrincipalComponent} from './usuario/principal/principal.component';
import { ListarComponent } from './usuario/listar/listar.component';
registerLocaleData(LocaleEs);




@NgModule({
  declarations: [
    PrincipalComponent,
    
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    DocumentoModule
  ],
  providers: [
    {
      provide: LOCALE_ID, useValue: 'es-CO'
    }
  ],
})
export class PagesModule { }

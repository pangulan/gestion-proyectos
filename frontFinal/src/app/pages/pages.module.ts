import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { registerLocaleData } from "@angular/common"
import LocaleEs from "@angular/common/locales/es-CO";
registerLocaleData(LocaleEs);



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
  ],
  providers: [
    {
      provide: LOCALE_ID, useValue: 'es-CO'
    }
  ],
})
export class PagesModule { }

import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { PorPaisComponent } from './pais/pages/por-pais/por-pais.component';
import { PorRegionComponent } from './pais/pages/por-region/por-region.component';
import { PorCapitalComponent } from './pais/pages/por-capital/por-capital.component';
import { VerPaisComponent } from './pais/pages/ver-pais/ver-pais.component';

// en la siguiente variable añadimos todas las paginas que creamos dentro de la aplicación, además de guardarlas dentro de una variable constante
// * para destacar dentro de este archivo vamos a configurar el router module a mano :D
const routes: Routes = [
    {
        // configuración de la página principal
        path: '', 
        component: PorPaisComponent,
        pathMatch:'full'
    },
    {
        path: 'region', 
        component: PorRegionComponent
    },
    {
        path: 'capital', 
        component: PorCapitalComponent
    },
    // configuracion para ver-pais
    {
        path: 'pais/:id', 
        component: VerPaisComponent
    },
    // configuración para cuando la persona desee entrar de otra manera a las páginas web
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule ({
    imports:[
        RouterModule.forRoot( routes )
    ],
    exports: [
        RouterModule
    ] 
})

export class AppRoutingModule {}

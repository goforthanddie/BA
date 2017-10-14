import {NgModule} from "@angular/core";
import { FormsModule } from '@angular/forms';
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {DemoComponent} from "./demo/demo.component";
import {HeroesComponent} from "./Heroes/heroes.component";
import {DemoDataService} from "./demo/demo-data.service";
import {HeroDataService} from "./Heroes/hero-data.service";
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
    {path: 'crisis-center', component: DemoComponent},
    {path: 'hero', component: DemoComponent},
    {
        path: 'heroes',
        component: HeroesComponent
    },
    {
        path: '',
        redirectTo: '/heroes',
        pathMatch: 'full'
    },
    {path: '**', component: AppComponent}
];

@NgModule({
    // Components, Pipes, Directive
    declarations: [
        AppComponent,
        DemoComponent,
        HeroesComponent
    ],
    // Entry Components
    entryComponents: [
        AppComponent
    ],
    // Providers
    providers: [
        DemoDataService,
        HeroDataService
    ],
    // Modules
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(
            appRoutes,
        )
    ],
    // Main Component
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {

    }
}

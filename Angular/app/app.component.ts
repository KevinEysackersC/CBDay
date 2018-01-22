import { Component } from "@angular/core"
@Component({
    selector: "bd-app",
    template: `
               <div>
                  <nav class='navbar navbar-inverse'>
                       <div class='container container-fluid'>
                         <ul class='nav navbar-nav'>
                           <li><a [routerLink]="['home']">Home</a></li>
                             <li><a [routerLink]="['dashboard']">Dashboard</a></li>
                           <li><a [routerLink]="['person']">Persons</a></li>
                        </ul>
                      </div>
                 </nav>    
                 <div class='container'>
                    <router-outlet></router-outlet>
                 </div>
             </div>          
`
})

export class AppComponent {

}
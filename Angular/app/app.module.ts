import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { HomeComponent } from './components/home.component';
import { PersonService} from './Service/person.service';
import { PersonComponent } from './components/person.component';
import { DashboardComponent } from './components/dashboard.component';
import { MyDatePickerModule } from 'mydatepicker';


@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, HttpModule, routing, Ng2Bs3ModalModule, MyDatePickerModule],
    declarations: [AppComponent, HomeComponent, PersonComponent, DashboardComponent],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }, PersonService],
    bootstrap: [AppComponent]
})

export class AppModule { }
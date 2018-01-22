import { Component, OnInit } from '@angular/core';
import { PersonService } from '../Service/person.service';
import { IPerson } from '../Models/person';
import { DBOperation } from '../shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';


@Component({

    templateUrl: 'app/Components/dashboard.component.html'

})

export class DashboardComponent implements OnInit {
    persons: IPerson[];
    person: IPerson;
    dbops: DBOperation;
    currentDate: Date = new Date();
    indLoadingUpcomming: boolean = false;

    constructor(private _personService: PersonService) {

    }

    ngOnInit(): void {
        this.loadUpcommingBirthdays();
    }

    loadUpcommingBirthdays(): void {
        this.indLoadingUpcomming = true;
        this._personService.post(Global.BASE_PERSON_ENDPOINT_Upcomming, 10)
            .subscribe(persons => {
                persons.forEach((item:IPerson) =>
                    item.BirthdayToday = (new Date(item.DateOfBirth).getDate() == this.currentDate.getDate() &&
                        new Date(item.DateOfBirth).getMonth() + 1 == this.currentDate.getMonth() + 1));
            

                this.persons = persons;
                this.indLoadingUpcomming = false;
            });
    }

}
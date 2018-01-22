import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PersonService } from '../Service/person.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';
import { IPerson } from '../Models/person';
import { DBOperation } from '../shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';
import { IMyDpOptions } from 'mydatepicker';


@Component({
    
    templateUrl: 'app/Components/person.component.html'

})

export class PersonComponent implements OnInit 
{
    @ViewChild('FirstName') elFirstName: ElementRef;
    @ViewChild('modal') modal: ModalComponent;
    persons: IPerson[];
    person: IPerson;
    msg: string;
    indLoading: boolean = false;
    personFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    currentDate: Date = new Date();

    constructor(private fb: FormBuilder, private _personService: PersonService) {
        
    }

    public myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd-mm-yyyy',
        disableSince: { year: this.currentDate.getFullYear(), month: this.currentDate.getMonth() + 1, day: this.currentDate.getDate() + 1}
    };

    ngOnInit(): void {
        this.personFrm = this.fb.group({
            Id: [''],
            FirstName: ['', Validators.required],
            Name: ['', Validators.required],
            DateOfBirth: ['', Validators.required]
        });
        this.loadPersons();
    }

    setDate(date: Date): void {
        this.personFrm.patchValue({
            DateOfBirth: {
                date: {
                    year: date.getFullYear(),
                    month: date.getMonth() + 1,
                    day: date.getDate()
                }
            }
        });
    }

    clearDate(): void {
        this.personFrm.patchValue({ DateOfBirth: null });
    }

    loadPersons(): void {
        this.indLoading = true;
        this._personService.get(Global.BASE_PERSON_ENDPOINT_GetAll)
            .subscribe(persons => { this.persons = persons; this.indLoading = false; this.persons.sort((a, b) => a.Name.toLowerCase() > b.Name.toLowerCase()? 1:-1); },
            error => this.msg = <any>error);

        
    }

    setControlsState(isEnable: boolean)
    {
        isEnable ? this.personFrm.enable() : this.personFrm.disable();
    }

    addPerson() {
        this.dbops = DBOperation.create;
        this.setControlsState(true);
        this.modalTitle = "Add New Person";
        this.modalBtnTitle = "Add";
        this.personFrm.reset();
        this.modal.open();
    }

    onOpen() {
        setTimeout(() => {
            this.elFirstName.nativeElement.focus();
        });
    }

    editPerson(id: string) {
        this.dbops = DBOperation.update;
        this.setControlsState(true);
        this.modalTitle = "Edit Person";
        this.modalBtnTitle = "Update";
        this.person = this.persons.filter(x => x.Id == id)[0];
        this.personFrm.setValue(this.person);
        this.setDate(new Date(this.person.DateOfBirth));
        this.modal.open();
        
    }

    deletePerson(id: string) {
        this.dbops = DBOperation.delete;
        this.setControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.person = this.persons.filter(x => x.Id == id)[0];
        this.personFrm.setValue(this.person);
        this.modal.open();
    }

    onSubmit(formData: any) {
        this.msg = "";
        if (formData.value.DateOfBirth.date != undefined){
        formData.value.DateOfBirth = formData.value.DateOfBirth.date.year.toString() +
            "-" +
            formData.value.DateOfBirth.date.month.toString() +
            "-" +
            formData.value.DateOfBirth.date.day.toString();
        }

        switch (this.dbops) {
        case DBOperation.create:
            this._personService.post(Global.BASE_PERSON_ENDPOINT_Create, formData._value).subscribe(
                data => {
                    if (data != null) //Success
                    {
                        this.msg = "Data successfully added.";
                        this.loadPersons();
                    }
                    else
                    {
                        this.msg = "There is some issue in saving records, please contact to system administrator!"
                    }
                    this.modal.dismiss();
                },
                error => {
                    this.msg = error;
                }
            );
            break;
        case DBOperation.update:
                this._personService.put(Global.BASE_PERSON_ENDPOINT_Update, formData._value.Id, formData._value).subscribe(
                data => {
                    if (data != null) //Success
                    {
                        this.msg = "Data successfully updated.";
                        this.loadPersons();
                    }
                    else {
                        this.msg = "There is some issue in saving records, please contact to system administrator!"
                    }

                    this.modal.dismiss();
                },
                error => {
                    this.msg = error;
                }
            );
            break;
        case DBOperation.delete:
                this._personService.delete(Global.BASE_PERSON_ENDPOINT_Delete, formData._value.Id).subscribe(
                data => {
                    if (data == null) //Success
                    {
                        this.msg = "Data successfully deleted.";
                        this.loadPersons();
                    }
                    else {
                        this.msg = "There is some issue in saving records, please contact to system administrator!"
                    }

                    this.modal.dismiss();
                },
                error => {
                    this.msg = error;
                }
            );
            break;

        }
    }
}
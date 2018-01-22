"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var person_service_1 = require("../Service/person.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../shared/enum");
var global_1 = require("../Shared/global");
var PersonComponent = (function () {
    function PersonComponent(fb, _personService) {
        this.fb = fb;
        this._personService = _personService;
        this.indLoading = false;
        this.currentDate = new Date();
        this.myDatePickerOptions = {
            dateFormat: 'dd-mm-yyyy',
            disableSince: { year: this.currentDate.getFullYear(), month: this.currentDate.getMonth() + 1, day: this.currentDate.getDate() + 1 }
        };
    }
    PersonComponent.prototype.ngOnInit = function () {
        this.personFrm = this.fb.group({
            Id: [''],
            FirstName: ['', forms_1.Validators.required],
            Name: ['', forms_1.Validators.required],
            DateOfBirth: ['', forms_1.Validators.required]
        });
        this.loadPersons();
    };
    PersonComponent.prototype.setDate = function (date) {
        this.personFrm.patchValue({
            DateOfBirth: {
                date: {
                    year: date.getFullYear(),
                    month: date.getMonth() + 1,
                    day: date.getDate()
                }
            }
        });
    };
    PersonComponent.prototype.clearDate = function () {
        this.personFrm.patchValue({ DateOfBirth: null });
    };
    PersonComponent.prototype.loadPersons = function () {
        var _this = this;
        this.indLoading = true;
        this._personService.get(global_1.Global.BASE_PERSON_ENDPOINT_GetAll)
            .subscribe(function (persons) { _this.persons = persons; _this.indLoading = false; _this.persons.sort(function (a, b) { return a.Name.toLowerCase() > b.Name.toLowerCase() ? 1 : -1; }); }, function (error) { return _this.msg = error; });
    };
    PersonComponent.prototype.setControlsState = function (isEnable) {
        isEnable ? this.personFrm.enable() : this.personFrm.disable();
    };
    PersonComponent.prototype.addPerson = function () {
        this.dbops = enum_1.DBOperation.create;
        this.setControlsState(true);
        this.modalTitle = "Add New Person";
        this.modalBtnTitle = "Add";
        this.personFrm.reset();
        this.modal.open();
    };
    PersonComponent.prototype.onOpen = function () {
        var _this = this;
        setTimeout(function () {
            _this.elFirstName.nativeElement.focus();
        });
    };
    PersonComponent.prototype.editPerson = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.setControlsState(true);
        this.modalTitle = "Edit Person";
        this.modalBtnTitle = "Update";
        this.person = this.persons.filter(function (x) { return x.Id == id; })[0];
        this.personFrm.setValue(this.person);
        this.setDate(new Date(this.person.DateOfBirth));
        this.modal.open();
    };
    PersonComponent.prototype.deletePerson = function (id) {
        this.dbops = enum_1.DBOperation.delete;
        this.setControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.person = this.persons.filter(function (x) { return x.Id == id; })[0];
        this.personFrm.setValue(this.person);
        this.modal.open();
    };
    PersonComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        if (formData.value.DateOfBirth.date != undefined) {
            formData.value.DateOfBirth = formData.value.DateOfBirth.date.year.toString() +
                "-" +
                formData.value.DateOfBirth.date.month.toString() +
                "-" +
                formData.value.DateOfBirth.date.day.toString();
        }
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._personService.post(global_1.Global.BASE_PERSON_ENDPOINT_Create, formData._value).subscribe(function (data) {
                    if (data != null) {
                        _this.msg = "Data successfully added.";
                        _this.loadPersons();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.update:
                this._personService.put(global_1.Global.BASE_PERSON_ENDPOINT_Update, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data != null) {
                        _this.msg = "Data successfully updated.";
                        _this.loadPersons();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.delete:
                this._personService.delete(global_1.Global.BASE_PERSON_ENDPOINT_Delete, formData._value.Id).subscribe(function (data) {
                    if (data == null) {
                        _this.msg = "Data successfully deleted.";
                        _this.loadPersons();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
        }
    };
    return PersonComponent;
}());
__decorate([
    core_1.ViewChild('FirstName'),
    __metadata("design:type", core_1.ElementRef)
], PersonComponent.prototype, "elFirstName", void 0);
__decorate([
    core_1.ViewChild('modal'),
    __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
], PersonComponent.prototype, "modal", void 0);
PersonComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/Components/person.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, person_service_1.PersonService])
], PersonComponent);
exports.PersonComponent = PersonComponent;
//# sourceMappingURL=person.component.js.map
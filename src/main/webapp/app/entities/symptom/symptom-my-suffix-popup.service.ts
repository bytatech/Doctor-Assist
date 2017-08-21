import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SymptomMySuffix } from './symptom-my-suffix.model';
import { SymptomMySuffixService } from './symptom-my-suffix.service';

@Injectable()
export class SymptomMySuffixPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private symptomService: SymptomMySuffixService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.symptomService.find(id).subscribe((symptom) => {
                this.symptomModalRef(component, symptom);
            });
        } else {
            return this.symptomModalRef(component, new SymptomMySuffix());
        }
    }

    symptomModalRef(component: Component, symptom: SymptomMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.symptom = symptom;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}

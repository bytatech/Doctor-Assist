import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TreatmentProcedureMySuffix } from './treatment-procedure-my-suffix.model';
import { TreatmentProcedureMySuffixService } from './treatment-procedure-my-suffix.service';

@Injectable()
export class TreatmentProcedureMySuffixPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private treatmentProcedureService: TreatmentProcedureMySuffixService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.treatmentProcedureService.find(id).subscribe((treatmentProcedure) => {
                this.treatmentProcedureModalRef(component, treatmentProcedure);
            });
        } else {
            return this.treatmentProcedureModalRef(component, new TreatmentProcedureMySuffix());
        }
    }

    treatmentProcedureModalRef(component: Component, treatmentProcedure: TreatmentProcedureMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.treatmentProcedure = treatmentProcedure;
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

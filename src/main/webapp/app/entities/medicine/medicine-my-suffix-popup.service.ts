import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MedicineMySuffix } from './medicine-my-suffix.model';
import { MedicineMySuffixService } from './medicine-my-suffix.service';

@Injectable()
export class MedicineMySuffixPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private medicineService: MedicineMySuffixService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.medicineService.find(id).subscribe((medicine) => {
                this.medicineModalRef(component, medicine);
            });
        } else {
            return this.medicineModalRef(component, new MedicineMySuffix());
        }
    }

    medicineModalRef(component: Component, medicine: MedicineMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.medicine = medicine;
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

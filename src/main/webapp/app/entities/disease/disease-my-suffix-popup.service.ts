import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DiseaseMySuffix } from './disease-my-suffix.model';
import { DiseaseMySuffixService } from './disease-my-suffix.service';

@Injectable()
export class DiseaseMySuffixPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private diseaseService: DiseaseMySuffixService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.diseaseService.find(id).subscribe((disease) => {
                this.diseaseModalRef(component, disease);
            });
        } else {
            return this.diseaseModalRef(component, new DiseaseMySuffix());
        }
    }

    diseaseModalRef(component: Component, disease: DiseaseMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.disease = disease;
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

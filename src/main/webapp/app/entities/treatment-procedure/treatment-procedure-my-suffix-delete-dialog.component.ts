import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TreatmentProcedureMySuffix } from './treatment-procedure-my-suffix.model';
import { TreatmentProcedureMySuffixPopupService } from './treatment-procedure-my-suffix-popup.service';
import { TreatmentProcedureMySuffixService } from './treatment-procedure-my-suffix.service';

@Component({
    selector: 'jhi-treatment-procedure-my-suffix-delete-dialog',
    templateUrl: './treatment-procedure-my-suffix-delete-dialog.component.html'
})
export class TreatmentProcedureMySuffixDeleteDialogComponent {

    treatmentProcedure: TreatmentProcedureMySuffix;

    constructor(
        private treatmentProcedureService: TreatmentProcedureMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.treatmentProcedureService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'treatmentProcedureListModification',
                content: 'Deleted an treatmentProcedure'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-treatment-procedure-my-suffix-delete-popup',
    template: ''
})
export class TreatmentProcedureMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private treatmentProcedurePopupService: TreatmentProcedureMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.treatmentProcedurePopupService
                .open(TreatmentProcedureMySuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

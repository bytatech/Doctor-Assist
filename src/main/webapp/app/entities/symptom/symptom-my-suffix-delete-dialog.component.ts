import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SymptomMySuffix } from './symptom-my-suffix.model';
import { SymptomMySuffixPopupService } from './symptom-my-suffix-popup.service';
import { SymptomMySuffixService } from './symptom-my-suffix.service';

@Component({
    selector: 'jhi-symptom-my-suffix-delete-dialog',
    templateUrl: './symptom-my-suffix-delete-dialog.component.html'
})
export class SymptomMySuffixDeleteDialogComponent {

    symptom: SymptomMySuffix;

    constructor(
        private symptomService: SymptomMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.symptomService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'symptomListModification',
                content: 'Deleted an symptom'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-symptom-my-suffix-delete-popup',
    template: ''
})
export class SymptomMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private symptomPopupService: SymptomMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.symptomPopupService
                .open(SymptomMySuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

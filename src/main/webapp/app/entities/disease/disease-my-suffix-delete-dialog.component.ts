import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DiseaseMySuffix } from './disease-my-suffix.model';
import { DiseaseMySuffixPopupService } from './disease-my-suffix-popup.service';
import { DiseaseMySuffixService } from './disease-my-suffix.service';

@Component({
    selector: 'jhi-disease-my-suffix-delete-dialog',
    templateUrl: './disease-my-suffix-delete-dialog.component.html'
})
export class DiseaseMySuffixDeleteDialogComponent {

    disease: DiseaseMySuffix;

    constructor(
        private diseaseService: DiseaseMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.diseaseService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'diseaseListModification',
                content: 'Deleted an disease'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-disease-my-suffix-delete-popup',
    template: ''
})
export class DiseaseMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private diseasePopupService: DiseaseMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.diseasePopupService
                .open(DiseaseMySuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

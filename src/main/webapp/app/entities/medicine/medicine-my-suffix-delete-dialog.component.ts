import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MedicineMySuffix } from './medicine-my-suffix.model';
import { MedicineMySuffixPopupService } from './medicine-my-suffix-popup.service';
import { MedicineMySuffixService } from './medicine-my-suffix.service';

@Component({
    selector: 'jhi-medicine-my-suffix-delete-dialog',
    templateUrl: './medicine-my-suffix-delete-dialog.component.html'
})
export class MedicineMySuffixDeleteDialogComponent {

    medicine: MedicineMySuffix;

    constructor(
        private medicineService: MedicineMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.medicineService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'medicineListModification',
                content: 'Deleted an medicine'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-medicine-my-suffix-delete-popup',
    template: ''
})
export class MedicineMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private medicinePopupService: MedicineMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.medicinePopupService
                .open(MedicineMySuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

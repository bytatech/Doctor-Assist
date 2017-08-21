import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DiagnosticTestMySuffix } from './diagnostic-test-my-suffix.model';
import { DiagnosticTestMySuffixPopupService } from './diagnostic-test-my-suffix-popup.service';
import { DiagnosticTestMySuffixService } from './diagnostic-test-my-suffix.service';

@Component({
    selector: 'jhi-diagnostic-test-my-suffix-delete-dialog',
    templateUrl: './diagnostic-test-my-suffix-delete-dialog.component.html'
})
export class DiagnosticTestMySuffixDeleteDialogComponent {

    diagnosticTest: DiagnosticTestMySuffix;

    constructor(
        private diagnosticTestService: DiagnosticTestMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.diagnosticTestService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'diagnosticTestListModification',
                content: 'Deleted an diagnosticTest'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-diagnostic-test-my-suffix-delete-popup',
    template: ''
})
export class DiagnosticTestMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private diagnosticTestPopupService: DiagnosticTestMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.diagnosticTestPopupService
                .open(DiagnosticTestMySuffixDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

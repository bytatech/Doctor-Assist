import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DiagnosticTestMySuffix } from './diagnostic-test-my-suffix.model';
import { DiagnosticTestMySuffixPopupService } from './diagnostic-test-my-suffix-popup.service';
import { DiagnosticTestMySuffixService } from './diagnostic-test-my-suffix.service';
import { TreatmentProcedureMySuffix, TreatmentProcedureMySuffixService } from '../treatment-procedure';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-diagnostic-test-my-suffix-dialog',
    templateUrl: './diagnostic-test-my-suffix-dialog.component.html'
})
export class DiagnosticTestMySuffixDialogComponent implements OnInit {

    diagnosticTest: DiagnosticTestMySuffix;
    authorities: any[];
    isSaving: boolean;

    treatmentprocedures: TreatmentProcedureMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private diagnosticTestService: DiagnosticTestMySuffixService,
        private treatmentProcedureService: TreatmentProcedureMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.treatmentProcedureService.query()
            .subscribe((res: ResponseWrapper) => { this.treatmentprocedures = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.diagnosticTest.id !== undefined) {
            this.subscribeToSaveResponse(
                this.diagnosticTestService.update(this.diagnosticTest));
        } else {
            this.subscribeToSaveResponse(
                this.diagnosticTestService.create(this.diagnosticTest));
        }
    }

    private subscribeToSaveResponse(result: Observable<DiagnosticTestMySuffix>) {
        result.subscribe((res: DiagnosticTestMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: DiagnosticTestMySuffix) {
        this.eventManager.broadcast({ name: 'diagnosticTestListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackTreatmentProcedureById(index: number, item: TreatmentProcedureMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-diagnostic-test-my-suffix-popup',
    template: ''
})
export class DiagnosticTestMySuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private diagnosticTestPopupService: DiagnosticTestMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.diagnosticTestPopupService
                    .open(DiagnosticTestMySuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.diagnosticTestPopupService
                    .open(DiagnosticTestMySuffixDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

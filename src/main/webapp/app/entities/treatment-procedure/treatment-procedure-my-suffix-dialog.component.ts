import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TreatmentProcedureMySuffix } from './treatment-procedure-my-suffix.model';
import { TreatmentProcedureMySuffixPopupService } from './treatment-procedure-my-suffix-popup.service';
import { TreatmentProcedureMySuffixService } from './treatment-procedure-my-suffix.service';
import { DiseaseMySuffix, DiseaseMySuffixService } from '../disease';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-treatment-procedure-my-suffix-dialog',
    templateUrl: './treatment-procedure-my-suffix-dialog.component.html'
})
export class TreatmentProcedureMySuffixDialogComponent implements OnInit {

    treatmentProcedure: TreatmentProcedureMySuffix;
    authorities: any[];
    isSaving: boolean;

    diseases: DiseaseMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private treatmentProcedureService: TreatmentProcedureMySuffixService,
        private diseaseService: DiseaseMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.diseaseService.query()
            .subscribe((res: ResponseWrapper) => { this.diseases = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.treatmentProcedure.id !== undefined) {
            this.subscribeToSaveResponse(
                this.treatmentProcedureService.update(this.treatmentProcedure));
        } else {
            this.subscribeToSaveResponse(
                this.treatmentProcedureService.create(this.treatmentProcedure));
        }
    }

    private subscribeToSaveResponse(result: Observable<TreatmentProcedureMySuffix>) {
        result.subscribe((res: TreatmentProcedureMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: TreatmentProcedureMySuffix) {
        this.eventManager.broadcast({ name: 'treatmentProcedureListModification', content: 'OK'});
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

    trackDiseaseById(index: number, item: DiseaseMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-treatment-procedure-my-suffix-popup',
    template: ''
})
export class TreatmentProcedureMySuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private treatmentProcedurePopupService: TreatmentProcedureMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.treatmentProcedurePopupService
                    .open(TreatmentProcedureMySuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.treatmentProcedurePopupService
                    .open(TreatmentProcedureMySuffixDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

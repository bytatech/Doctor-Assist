import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MedicineMySuffix } from './medicine-my-suffix.model';
import { MedicineMySuffixPopupService } from './medicine-my-suffix-popup.service';
import { MedicineMySuffixService } from './medicine-my-suffix.service';
import { TreatmentProcedureMySuffix, TreatmentProcedureMySuffixService } from '../treatment-procedure';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-medicine-my-suffix-dialog',
    templateUrl: './medicine-my-suffix-dialog.component.html'
})
export class MedicineMySuffixDialogComponent implements OnInit {

    medicine: MedicineMySuffix;
    authorities: any[];
    isSaving: boolean;

    treatmentprocedures: TreatmentProcedureMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private medicineService: MedicineMySuffixService,
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
        if (this.medicine.id !== undefined) {
            this.subscribeToSaveResponse(
                this.medicineService.update(this.medicine));
        } else {
            this.subscribeToSaveResponse(
                this.medicineService.create(this.medicine));
        }
    }

    private subscribeToSaveResponse(result: Observable<MedicineMySuffix>) {
        result.subscribe((res: MedicineMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: MedicineMySuffix) {
        this.eventManager.broadcast({ name: 'medicineListModification', content: 'OK'});
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
    selector: 'jhi-medicine-my-suffix-popup',
    template: ''
})
export class MedicineMySuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private medicinePopupService: MedicineMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.medicinePopupService
                    .open(MedicineMySuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.medicinePopupService
                    .open(MedicineMySuffixDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

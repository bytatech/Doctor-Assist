import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SymptomMySuffix } from './symptom-my-suffix.model';
import { SymptomMySuffixPopupService } from './symptom-my-suffix-popup.service';
import { SymptomMySuffixService } from './symptom-my-suffix.service';
import { DiseaseMySuffix, DiseaseMySuffixService } from '../disease';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-symptom-my-suffix-dialog',
    templateUrl: './symptom-my-suffix-dialog.component.html'
})
export class SymptomMySuffixDialogComponent implements OnInit {

    symptom: SymptomMySuffix;
    authorities: any[];
    isSaving: boolean;

    diseases: DiseaseMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private symptomService: SymptomMySuffixService,
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
        if (this.symptom.id !== undefined) {
            this.subscribeToSaveResponse(
                this.symptomService.update(this.symptom));
        } else {
            this.subscribeToSaveResponse(
                this.symptomService.create(this.symptom));
        }
    }

    private subscribeToSaveResponse(result: Observable<SymptomMySuffix>) {
        result.subscribe((res: SymptomMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: SymptomMySuffix) {
        this.eventManager.broadcast({ name: 'symptomListModification', content: 'OK'});
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

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-symptom-my-suffix-popup',
    template: ''
})
export class SymptomMySuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private symptomPopupService: SymptomMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.symptomPopupService
                    .open(SymptomMySuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.symptomPopupService
                    .open(SymptomMySuffixDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

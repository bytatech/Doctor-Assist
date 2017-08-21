import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DiseaseMySuffix } from './disease-my-suffix.model';
import { DiseaseMySuffixPopupService } from './disease-my-suffix-popup.service';
import { DiseaseMySuffixService } from './disease-my-suffix.service';
import { SymptomMySuffix, SymptomMySuffixService } from '../symptom';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-disease-my-suffix-dialog',
    templateUrl: './disease-my-suffix-dialog.component.html'
})
export class DiseaseMySuffixDialogComponent implements OnInit {

    disease: DiseaseMySuffix;
    authorities: any[];
    isSaving: boolean;

    symptoms: SymptomMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private diseaseService: DiseaseMySuffixService,
        private symptomService: SymptomMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.symptomService.query()
            .subscribe((res: ResponseWrapper) => { this.symptoms = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.disease.id !== undefined) {
            this.subscribeToSaveResponse(
                this.diseaseService.update(this.disease));
        } else {
            this.subscribeToSaveResponse(
                this.diseaseService.create(this.disease));
        }
    }

    private subscribeToSaveResponse(result: Observable<DiseaseMySuffix>) {
        result.subscribe((res: DiseaseMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: DiseaseMySuffix) {
        this.eventManager.broadcast({ name: 'diseaseListModification', content: 'OK'});
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

    trackSymptomById(index: number, item: SymptomMySuffix) {
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
    selector: 'jhi-disease-my-suffix-popup',
    template: ''
})
export class DiseaseMySuffixPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private diseasePopupService: DiseaseMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.diseasePopupService
                    .open(DiseaseMySuffixDialogComponent, params['id']);
            } else {
                this.modalRef = this.diseasePopupService
                    .open(DiseaseMySuffixDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

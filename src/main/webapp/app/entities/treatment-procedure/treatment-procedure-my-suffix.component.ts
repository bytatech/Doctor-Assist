import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { TreatmentProcedureMySuffix } from './treatment-procedure-my-suffix.model';
import { TreatmentProcedureMySuffixService } from './treatment-procedure-my-suffix.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-treatment-procedure-my-suffix',
    templateUrl: './treatment-procedure-my-suffix.component.html'
})
export class TreatmentProcedureMySuffixComponent implements OnInit, OnDestroy {
treatmentProcedures: TreatmentProcedureMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private treatmentProcedureService: TreatmentProcedureMySuffixService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.treatmentProcedureService.query().subscribe(
            (res: ResponseWrapper) => {
                this.treatmentProcedures = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTreatmentProcedures();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TreatmentProcedureMySuffix) {
        return item.id;
    }
    registerChangeInTreatmentProcedures() {
        this.eventSubscriber = this.eventManager.subscribe('treatmentProcedureListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

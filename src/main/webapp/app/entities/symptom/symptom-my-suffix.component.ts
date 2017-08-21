import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { SymptomMySuffix } from './symptom-my-suffix.model';
import { SymptomMySuffixService } from './symptom-my-suffix.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-symptom-my-suffix',
    templateUrl: './symptom-my-suffix.component.html'
})
export class SymptomMySuffixComponent implements OnInit, OnDestroy {
symptoms: SymptomMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private symptomService: SymptomMySuffixService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.symptomService.query().subscribe(
            (res: ResponseWrapper) => {
                this.symptoms = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSymptoms();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SymptomMySuffix) {
        return item.id;
    }
    registerChangeInSymptoms() {
        this.eventSubscriber = this.eventManager.subscribe('symptomListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

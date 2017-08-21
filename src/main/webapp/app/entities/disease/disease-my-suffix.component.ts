import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { DiseaseMySuffix } from './disease-my-suffix.model';
import { DiseaseMySuffixService } from './disease-my-suffix.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-disease-my-suffix',
    templateUrl: './disease-my-suffix.component.html'
})
export class DiseaseMySuffixComponent implements OnInit, OnDestroy {
diseases: DiseaseMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private diseaseService: DiseaseMySuffixService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.diseaseService.query().subscribe(
            (res: ResponseWrapper) => {
                this.diseases = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDiseases();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DiseaseMySuffix) {
        return item.id;
    }
    registerChangeInDiseases() {
        this.eventSubscriber = this.eventManager.subscribe('diseaseListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { DiagnosticTestMySuffix } from './diagnostic-test-my-suffix.model';
import { DiagnosticTestMySuffixService } from './diagnostic-test-my-suffix.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-diagnostic-test-my-suffix',
    templateUrl: './diagnostic-test-my-suffix.component.html'
})
export class DiagnosticTestMySuffixComponent implements OnInit, OnDestroy {
diagnosticTests: DiagnosticTestMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private diagnosticTestService: DiagnosticTestMySuffixService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.diagnosticTestService.query().subscribe(
            (res: ResponseWrapper) => {
                this.diagnosticTests = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDiagnosticTests();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DiagnosticTestMySuffix) {
        return item.id;
    }
    registerChangeInDiagnosticTests() {
        this.eventSubscriber = this.eventManager.subscribe('diagnosticTestListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

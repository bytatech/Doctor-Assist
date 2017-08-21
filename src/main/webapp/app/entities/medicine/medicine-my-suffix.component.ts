import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { MedicineMySuffix } from './medicine-my-suffix.model';
import { MedicineMySuffixService } from './medicine-my-suffix.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-medicine-my-suffix',
    templateUrl: './medicine-my-suffix.component.html'
})
export class MedicineMySuffixComponent implements OnInit, OnDestroy {
medicines: MedicineMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private medicineService: MedicineMySuffixService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.medicineService.query().subscribe(
            (res: ResponseWrapper) => {
                this.medicines = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMedicines();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: MedicineMySuffix) {
        return item.id;
    }
    registerChangeInMedicines() {
        this.eventSubscriber = this.eventManager.subscribe('medicineListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

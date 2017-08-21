import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { TreatmentProcedureMySuffix } from './treatment-procedure-my-suffix.model';
import { TreatmentProcedureMySuffixService } from './treatment-procedure-my-suffix.service';

@Component({
    selector: 'jhi-treatment-procedure-my-suffix-detail',
    templateUrl: './treatment-procedure-my-suffix-detail.component.html'
})
export class TreatmentProcedureMySuffixDetailComponent implements OnInit, OnDestroy {

    treatmentProcedure: TreatmentProcedureMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private treatmentProcedureService: TreatmentProcedureMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTreatmentProcedures();
    }

    load(id) {
        this.treatmentProcedureService.find(id).subscribe((treatmentProcedure) => {
            this.treatmentProcedure = treatmentProcedure;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTreatmentProcedures() {
        this.eventSubscriber = this.eventManager.subscribe(
            'treatmentProcedureListModification',
            (response) => this.load(this.treatmentProcedure.id)
        );
    }
}

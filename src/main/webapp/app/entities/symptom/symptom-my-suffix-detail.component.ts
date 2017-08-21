import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { SymptomMySuffix } from './symptom-my-suffix.model';
import { SymptomMySuffixService } from './symptom-my-suffix.service';

@Component({
    selector: 'jhi-symptom-my-suffix-detail',
    templateUrl: './symptom-my-suffix-detail.component.html'
})
export class SymptomMySuffixDetailComponent implements OnInit, OnDestroy {

    symptom: SymptomMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private symptomService: SymptomMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSymptoms();
    }

    load(id) {
        this.symptomService.find(id).subscribe((symptom) => {
            this.symptom = symptom;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSymptoms() {
        this.eventSubscriber = this.eventManager.subscribe(
            'symptomListModification',
            (response) => this.load(this.symptom.id)
        );
    }
}

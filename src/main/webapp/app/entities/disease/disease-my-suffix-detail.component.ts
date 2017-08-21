import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { DiseaseMySuffix } from './disease-my-suffix.model';
import { DiseaseMySuffixService } from './disease-my-suffix.service';

@Component({
    selector: 'jhi-disease-my-suffix-detail',
    templateUrl: './disease-my-suffix-detail.component.html'
})
export class DiseaseMySuffixDetailComponent implements OnInit, OnDestroy {

    disease: DiseaseMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private diseaseService: DiseaseMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDiseases();
    }

    load(id) {
        this.diseaseService.find(id).subscribe((disease) => {
            this.disease = disease;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDiseases() {
        this.eventSubscriber = this.eventManager.subscribe(
            'diseaseListModification',
            (response) => this.load(this.disease.id)
        );
    }
}

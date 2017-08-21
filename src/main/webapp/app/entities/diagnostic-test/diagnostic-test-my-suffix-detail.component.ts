import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { DiagnosticTestMySuffix } from './diagnostic-test-my-suffix.model';
import { DiagnosticTestMySuffixService } from './diagnostic-test-my-suffix.service';

@Component({
    selector: 'jhi-diagnostic-test-my-suffix-detail',
    templateUrl: './diagnostic-test-my-suffix-detail.component.html'
})
export class DiagnosticTestMySuffixDetailComponent implements OnInit, OnDestroy {

    diagnosticTest: DiagnosticTestMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private diagnosticTestService: DiagnosticTestMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDiagnosticTests();
    }

    load(id) {
        this.diagnosticTestService.find(id).subscribe((diagnosticTest) => {
            this.diagnosticTest = diagnosticTest;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDiagnosticTests() {
        this.eventSubscriber = this.eventManager.subscribe(
            'diagnosticTestListModification',
            (response) => this.load(this.diagnosticTest.id)
        );
    }
}

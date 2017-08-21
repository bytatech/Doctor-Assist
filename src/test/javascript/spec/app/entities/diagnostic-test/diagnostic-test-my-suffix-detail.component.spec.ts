/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BytaTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DiagnosticTestMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/diagnostic-test/diagnostic-test-my-suffix-detail.component';
import { DiagnosticTestMySuffixService } from '../../../../../../main/webapp/app/entities/diagnostic-test/diagnostic-test-my-suffix.service';
import { DiagnosticTestMySuffix } from '../../../../../../main/webapp/app/entities/diagnostic-test/diagnostic-test-my-suffix.model';

describe('Component Tests', () => {

    describe('DiagnosticTestMySuffix Management Detail Component', () => {
        let comp: DiagnosticTestMySuffixDetailComponent;
        let fixture: ComponentFixture<DiagnosticTestMySuffixDetailComponent>;
        let service: DiagnosticTestMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BytaTestModule],
                declarations: [DiagnosticTestMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DiagnosticTestMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(DiagnosticTestMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DiagnosticTestMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiagnosticTestMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new DiagnosticTestMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.diagnosticTest).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});

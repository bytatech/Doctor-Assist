/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BytaTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SymptomMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/symptom/symptom-my-suffix-detail.component';
import { SymptomMySuffixService } from '../../../../../../main/webapp/app/entities/symptom/symptom-my-suffix.service';
import { SymptomMySuffix } from '../../../../../../main/webapp/app/entities/symptom/symptom-my-suffix.model';

describe('Component Tests', () => {

    describe('SymptomMySuffix Management Detail Component', () => {
        let comp: SymptomMySuffixDetailComponent;
        let fixture: ComponentFixture<SymptomMySuffixDetailComponent>;
        let service: SymptomMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BytaTestModule],
                declarations: [SymptomMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SymptomMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(SymptomMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SymptomMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SymptomMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new SymptomMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.symptom).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BytaTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TreatmentProcedureMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/treatment-procedure/treatment-procedure-my-suffix-detail.component';
import { TreatmentProcedureMySuffixService } from '../../../../../../main/webapp/app/entities/treatment-procedure/treatment-procedure-my-suffix.service';
import { TreatmentProcedureMySuffix } from '../../../../../../main/webapp/app/entities/treatment-procedure/treatment-procedure-my-suffix.model';

describe('Component Tests', () => {

    describe('TreatmentProcedureMySuffix Management Detail Component', () => {
        let comp: TreatmentProcedureMySuffixDetailComponent;
        let fixture: ComponentFixture<TreatmentProcedureMySuffixDetailComponent>;
        let service: TreatmentProcedureMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BytaTestModule],
                declarations: [TreatmentProcedureMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TreatmentProcedureMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(TreatmentProcedureMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TreatmentProcedureMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TreatmentProcedureMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new TreatmentProcedureMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.treatmentProcedure).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});

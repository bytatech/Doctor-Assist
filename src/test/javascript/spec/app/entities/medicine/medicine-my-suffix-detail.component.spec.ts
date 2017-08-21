/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BytaTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MedicineMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/medicine/medicine-my-suffix-detail.component';
import { MedicineMySuffixService } from '../../../../../../main/webapp/app/entities/medicine/medicine-my-suffix.service';
import { MedicineMySuffix } from '../../../../../../main/webapp/app/entities/medicine/medicine-my-suffix.model';

describe('Component Tests', () => {

    describe('MedicineMySuffix Management Detail Component', () => {
        let comp: MedicineMySuffixDetailComponent;
        let fixture: ComponentFixture<MedicineMySuffixDetailComponent>;
        let service: MedicineMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BytaTestModule],
                declarations: [MedicineMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MedicineMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(MedicineMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MedicineMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MedicineMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new MedicineMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.medicine).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});

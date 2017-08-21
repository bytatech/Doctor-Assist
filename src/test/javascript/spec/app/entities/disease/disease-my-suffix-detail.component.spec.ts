/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BytaTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DiseaseMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/disease/disease-my-suffix-detail.component';
import { DiseaseMySuffixService } from '../../../../../../main/webapp/app/entities/disease/disease-my-suffix.service';
import { DiseaseMySuffix } from '../../../../../../main/webapp/app/entities/disease/disease-my-suffix.model';

describe('Component Tests', () => {

    describe('DiseaseMySuffix Management Detail Component', () => {
        let comp: DiseaseMySuffixDetailComponent;
        let fixture: ComponentFixture<DiseaseMySuffixDetailComponent>;
        let service: DiseaseMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BytaTestModule],
                declarations: [DiseaseMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DiseaseMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(DiseaseMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DiseaseMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiseaseMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new DiseaseMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.disease).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});

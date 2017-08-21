import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TreatmentProcedureMySuffixComponent } from './treatment-procedure-my-suffix.component';
import { TreatmentProcedureMySuffixDetailComponent } from './treatment-procedure-my-suffix-detail.component';
import { TreatmentProcedureMySuffixPopupComponent } from './treatment-procedure-my-suffix-dialog.component';
import { TreatmentProcedureMySuffixDeletePopupComponent } from './treatment-procedure-my-suffix-delete-dialog.component';

import { Principal } from '../../shared';

export const treatmentProcedureRoute: Routes = [
    {
        path: 'treatment-procedure-my-suffix',
        component: TreatmentProcedureMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bytaApp.treatmentProcedure.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'treatment-procedure-my-suffix/:id',
        component: TreatmentProcedureMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bytaApp.treatmentProcedure.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const treatmentProcedurePopupRoute: Routes = [
    {
        path: 'treatment-procedure-my-suffix-new',
        component: TreatmentProcedureMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bytaApp.treatmentProcedure.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'treatment-procedure-my-suffix/:id/edit',
        component: TreatmentProcedureMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bytaApp.treatmentProcedure.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'treatment-procedure-my-suffix/:id/delete',
        component: TreatmentProcedureMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bytaApp.treatmentProcedure.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

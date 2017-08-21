import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SymptomMySuffixComponent } from './symptom-my-suffix.component';
import { SymptomMySuffixDetailComponent } from './symptom-my-suffix-detail.component';
import { SymptomMySuffixPopupComponent } from './symptom-my-suffix-dialog.component';
import { SymptomMySuffixDeletePopupComponent } from './symptom-my-suffix-delete-dialog.component';

import { Principal } from '../../shared';

export const symptomRoute: Routes = [
    {
        path: 'symptom-my-suffix',
        component: SymptomMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bytaApp.symptom.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'symptom-my-suffix/:id',
        component: SymptomMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bytaApp.symptom.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const symptomPopupRoute: Routes = [
    {
        path: 'symptom-my-suffix-new',
        component: SymptomMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bytaApp.symptom.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'symptom-my-suffix/:id/edit',
        component: SymptomMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bytaApp.symptom.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'symptom-my-suffix/:id/delete',
        component: SymptomMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bytaApp.symptom.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

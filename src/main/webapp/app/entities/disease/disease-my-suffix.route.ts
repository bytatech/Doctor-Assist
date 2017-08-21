import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DiseaseMySuffixComponent } from './disease-my-suffix.component';
import { DiseaseMySuffixDetailComponent } from './disease-my-suffix-detail.component';
import { DiseaseMySuffixPopupComponent } from './disease-my-suffix-dialog.component';
import { DiseaseMySuffixDeletePopupComponent } from './disease-my-suffix-delete-dialog.component';

import { Principal } from '../../shared';

export const diseaseRoute: Routes = [
    {
        path: 'disease-my-suffix',
        component: DiseaseMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bytaApp.disease.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'disease-my-suffix/:id',
        component: DiseaseMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bytaApp.disease.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const diseasePopupRoute: Routes = [
    {
        path: 'disease-my-suffix-new',
        component: DiseaseMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bytaApp.disease.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'disease-my-suffix/:id/edit',
        component: DiseaseMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bytaApp.disease.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'disease-my-suffix/:id/delete',
        component: DiseaseMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bytaApp.disease.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

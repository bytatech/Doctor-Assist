import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MedicineMySuffixComponent } from './medicine-my-suffix.component';
import { MedicineMySuffixDetailComponent } from './medicine-my-suffix-detail.component';
import { MedicineMySuffixPopupComponent } from './medicine-my-suffix-dialog.component';
import { MedicineMySuffixDeletePopupComponent } from './medicine-my-suffix-delete-dialog.component';

import { Principal } from '../../shared';

export const medicineRoute: Routes = [
    {
        path: 'medicine-my-suffix',
        component: MedicineMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bytaApp.medicine.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'medicine-my-suffix/:id',
        component: MedicineMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bytaApp.medicine.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const medicinePopupRoute: Routes = [
    {
        path: 'medicine-my-suffix-new',
        component: MedicineMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bytaApp.medicine.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'medicine-my-suffix/:id/edit',
        component: MedicineMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bytaApp.medicine.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'medicine-my-suffix/:id/delete',
        component: MedicineMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bytaApp.medicine.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

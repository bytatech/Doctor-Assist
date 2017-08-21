import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DiagnosticTestMySuffixComponent } from './diagnostic-test-my-suffix.component';
import { DiagnosticTestMySuffixDetailComponent } from './diagnostic-test-my-suffix-detail.component';
import { DiagnosticTestMySuffixPopupComponent } from './diagnostic-test-my-suffix-dialog.component';
import { DiagnosticTestMySuffixDeletePopupComponent } from './diagnostic-test-my-suffix-delete-dialog.component';

import { Principal } from '../../shared';

export const diagnosticTestRoute: Routes = [
    {
        path: 'diagnostic-test-my-suffix',
        component: DiagnosticTestMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bytaApp.diagnosticTest.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'diagnostic-test-my-suffix/:id',
        component: DiagnosticTestMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bytaApp.diagnosticTest.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const diagnosticTestPopupRoute: Routes = [
    {
        path: 'diagnostic-test-my-suffix-new',
        component: DiagnosticTestMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bytaApp.diagnosticTest.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'diagnostic-test-my-suffix/:id/edit',
        component: DiagnosticTestMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bytaApp.diagnosticTest.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'diagnostic-test-my-suffix/:id/delete',
        component: DiagnosticTestMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bytaApp.diagnosticTest.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BytaSharedModule } from '../../shared';
import {
    DiagnosticTestMySuffixService,
    DiagnosticTestMySuffixPopupService,
    DiagnosticTestMySuffixComponent,
    DiagnosticTestMySuffixDetailComponent,
    DiagnosticTestMySuffixDialogComponent,
    DiagnosticTestMySuffixPopupComponent,
    DiagnosticTestMySuffixDeletePopupComponent,
    DiagnosticTestMySuffixDeleteDialogComponent,
    diagnosticTestRoute,
    diagnosticTestPopupRoute,
} from './';

const ENTITY_STATES = [
    ...diagnosticTestRoute,
    ...diagnosticTestPopupRoute,
];

@NgModule({
    imports: [
        BytaSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DiagnosticTestMySuffixComponent,
        DiagnosticTestMySuffixDetailComponent,
        DiagnosticTestMySuffixDialogComponent,
        DiagnosticTestMySuffixDeleteDialogComponent,
        DiagnosticTestMySuffixPopupComponent,
        DiagnosticTestMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        DiagnosticTestMySuffixComponent,
        DiagnosticTestMySuffixDialogComponent,
        DiagnosticTestMySuffixPopupComponent,
        DiagnosticTestMySuffixDeleteDialogComponent,
        DiagnosticTestMySuffixDeletePopupComponent,
    ],
    providers: [
        DiagnosticTestMySuffixService,
        DiagnosticTestMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BytaDiagnosticTestMySuffixModule {}

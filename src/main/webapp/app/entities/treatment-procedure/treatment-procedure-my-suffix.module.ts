import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BytaSharedModule } from '../../shared';
import {
    TreatmentProcedureMySuffixService,
    TreatmentProcedureMySuffixPopupService,
    TreatmentProcedureMySuffixComponent,
    TreatmentProcedureMySuffixDetailComponent,
    TreatmentProcedureMySuffixDialogComponent,
    TreatmentProcedureMySuffixPopupComponent,
    TreatmentProcedureMySuffixDeletePopupComponent,
    TreatmentProcedureMySuffixDeleteDialogComponent,
    treatmentProcedureRoute,
    treatmentProcedurePopupRoute,
} from './';

const ENTITY_STATES = [
    ...treatmentProcedureRoute,
    ...treatmentProcedurePopupRoute,
];

@NgModule({
    imports: [
        BytaSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TreatmentProcedureMySuffixComponent,
        TreatmentProcedureMySuffixDetailComponent,
        TreatmentProcedureMySuffixDialogComponent,
        TreatmentProcedureMySuffixDeleteDialogComponent,
        TreatmentProcedureMySuffixPopupComponent,
        TreatmentProcedureMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        TreatmentProcedureMySuffixComponent,
        TreatmentProcedureMySuffixDialogComponent,
        TreatmentProcedureMySuffixPopupComponent,
        TreatmentProcedureMySuffixDeleteDialogComponent,
        TreatmentProcedureMySuffixDeletePopupComponent,
    ],
    providers: [
        TreatmentProcedureMySuffixService,
        TreatmentProcedureMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BytaTreatmentProcedureMySuffixModule {}

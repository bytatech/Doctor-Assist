import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BytaSharedModule } from '../../shared';
import {
    SymptomMySuffixService,
    SymptomMySuffixPopupService,
    SymptomMySuffixComponent,
    SymptomMySuffixDetailComponent,
    SymptomMySuffixDialogComponent,
    SymptomMySuffixPopupComponent,
    SymptomMySuffixDeletePopupComponent,
    SymptomMySuffixDeleteDialogComponent,
    symptomRoute,
    symptomPopupRoute,
} from './';

const ENTITY_STATES = [
    ...symptomRoute,
    ...symptomPopupRoute,
];

@NgModule({
    imports: [
        BytaSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        SymptomMySuffixComponent,
        SymptomMySuffixDetailComponent,
        SymptomMySuffixDialogComponent,
        SymptomMySuffixDeleteDialogComponent,
        SymptomMySuffixPopupComponent,
        SymptomMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        SymptomMySuffixComponent,
        SymptomMySuffixDialogComponent,
        SymptomMySuffixPopupComponent,
        SymptomMySuffixDeleteDialogComponent,
        SymptomMySuffixDeletePopupComponent,
    ],
    providers: [
        SymptomMySuffixService,
        SymptomMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BytaSymptomMySuffixModule {}

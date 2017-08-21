import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BytaSharedModule } from '../../shared';
import {
    DiseaseMySuffixService,
    DiseaseMySuffixPopupService,
    DiseaseMySuffixComponent,
    DiseaseMySuffixDetailComponent,
    DiseaseMySuffixDialogComponent,
    DiseaseMySuffixPopupComponent,
    DiseaseMySuffixDeletePopupComponent,
    DiseaseMySuffixDeleteDialogComponent,
    diseaseRoute,
    diseasePopupRoute,
} from './';

const ENTITY_STATES = [
    ...diseaseRoute,
    ...diseasePopupRoute,
];

@NgModule({
    imports: [
        BytaSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DiseaseMySuffixComponent,
        DiseaseMySuffixDetailComponent,
        DiseaseMySuffixDialogComponent,
        DiseaseMySuffixDeleteDialogComponent,
        DiseaseMySuffixPopupComponent,
        DiseaseMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        DiseaseMySuffixComponent,
        DiseaseMySuffixDialogComponent,
        DiseaseMySuffixPopupComponent,
        DiseaseMySuffixDeleteDialogComponent,
        DiseaseMySuffixDeletePopupComponent,
    ],
    providers: [
        DiseaseMySuffixService,
        DiseaseMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BytaDiseaseMySuffixModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BytaSharedModule } from '../../shared';
import {
    MedicineMySuffixService,
    MedicineMySuffixPopupService,
    MedicineMySuffixComponent,
    MedicineMySuffixDetailComponent,
    MedicineMySuffixDialogComponent,
    MedicineMySuffixPopupComponent,
    MedicineMySuffixDeletePopupComponent,
    MedicineMySuffixDeleteDialogComponent,
    medicineRoute,
    medicinePopupRoute,
} from './';

const ENTITY_STATES = [
    ...medicineRoute,
    ...medicinePopupRoute,
];

@NgModule({
    imports: [
        BytaSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MedicineMySuffixComponent,
        MedicineMySuffixDetailComponent,
        MedicineMySuffixDialogComponent,
        MedicineMySuffixDeleteDialogComponent,
        MedicineMySuffixPopupComponent,
        MedicineMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        MedicineMySuffixComponent,
        MedicineMySuffixDialogComponent,
        MedicineMySuffixPopupComponent,
        MedicineMySuffixDeleteDialogComponent,
        MedicineMySuffixDeletePopupComponent,
    ],
    providers: [
        MedicineMySuffixService,
        MedicineMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BytaMedicineMySuffixModule {}

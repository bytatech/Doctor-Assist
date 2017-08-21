import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BytaDiseaseMySuffixModule } from './disease/disease-my-suffix.module';
import { BytaSymptomMySuffixModule } from './symptom/symptom-my-suffix.module';
import { BytaMedicineMySuffixModule } from './medicine/medicine-my-suffix.module';
import { BytaTreatmentProcedureMySuffixModule } from './treatment-procedure/treatment-procedure-my-suffix.module';
import { BytaDiagnosticTestMySuffixModule } from './diagnostic-test/diagnostic-test-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        BytaDiseaseMySuffixModule,
        BytaSymptomMySuffixModule,
        BytaMedicineMySuffixModule,
        BytaTreatmentProcedureMySuffixModule,
        BytaDiagnosticTestMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BytaEntityModule {}

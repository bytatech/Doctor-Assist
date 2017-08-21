import { BaseEntity } from './../../shared';

export class DiagnosticTestMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public treatmentProcedure?: BaseEntity,
    ) {
    }
}

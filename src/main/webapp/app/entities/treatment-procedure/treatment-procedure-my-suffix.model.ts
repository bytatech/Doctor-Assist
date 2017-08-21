import { BaseEntity } from './../../shared';

export class TreatmentProcedureMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public medicines?: BaseEntity[],
        public diagnosticTests?: BaseEntity[],
        public disease?: BaseEntity,
    ) {
    }
}

import { BaseEntity } from './../../shared';

export class DiseaseMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public treatmentProcedures?: BaseEntity[],
        public symptoms?: BaseEntity[],
    ) {
    }
}

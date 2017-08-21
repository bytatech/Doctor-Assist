import { BaseEntity } from './../../shared';

export class MedicineMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public dose?: number,
        public treatmentProcedure?: BaseEntity,
    ) {
    }
}

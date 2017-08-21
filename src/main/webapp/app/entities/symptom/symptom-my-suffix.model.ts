import { BaseEntity } from './../../shared';

export class SymptomMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public names?: BaseEntity[],
    ) {
    }
}

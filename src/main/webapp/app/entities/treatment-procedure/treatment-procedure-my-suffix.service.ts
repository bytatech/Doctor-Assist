import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { TreatmentProcedureMySuffix } from './treatment-procedure-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TreatmentProcedureMySuffixService {

    private resourceUrl = 'api/treatment-procedures';

    constructor(private http: Http) { }

    create(treatmentProcedure: TreatmentProcedureMySuffix): Observable<TreatmentProcedureMySuffix> {
        const copy = this.convert(treatmentProcedure);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(treatmentProcedure: TreatmentProcedureMySuffix): Observable<TreatmentProcedureMySuffix> {
        const copy = this.convert(treatmentProcedure);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<TreatmentProcedureMySuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(treatmentProcedure: TreatmentProcedureMySuffix): TreatmentProcedureMySuffix {
        const copy: TreatmentProcedureMySuffix = Object.assign({}, treatmentProcedure);
        return copy;
    }
}

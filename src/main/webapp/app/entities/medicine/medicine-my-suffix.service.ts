import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { MedicineMySuffix } from './medicine-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MedicineMySuffixService {

    private resourceUrl = 'api/medicines';

    constructor(private http: Http) { }

    create(medicine: MedicineMySuffix): Observable<MedicineMySuffix> {
        const copy = this.convert(medicine);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(medicine: MedicineMySuffix): Observable<MedicineMySuffix> {
        const copy = this.convert(medicine);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<MedicineMySuffix> {
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

    private convert(medicine: MedicineMySuffix): MedicineMySuffix {
        const copy: MedicineMySuffix = Object.assign({}, medicine);
        return copy;
    }
}

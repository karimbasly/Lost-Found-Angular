import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ComplaintService {

  constructor() {
  }
/*
  create(complaint: Complaint): Observable<Complaint> {
    return of(complaint);
  }

  searchAll(): Observable<Complaint[]> {
    return of([
      {id: '1', barcode:'code1', description:'desc example', state: 'Opened'},
      {id: '2', barcode:'code2', description:'desc example', state: 'Opened'},
      {id: '3', barcode:'code3', description:'desc example', state: 'Opened'},
      {id: '4', barcode:'code4', description:'desc example', state: 'Opened'}
    ]);
  }

  read(id: string): Observable<Complaint> {
    return of(
      {id: id, barcode:'code'+id, description:'desc example', reply:''}
    );
  }

  delete(id: string): Observable<void> {
    return of(id = null);
  }

  update(oldId: string, complaint: Complaint): Observable<Complaint> {
    return of(complaint);
  } /*/
}

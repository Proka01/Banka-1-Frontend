import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom, Observable} from "rxjs";
import {Forex, Future, ListingHistory} from "../model/model";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FutureService {

  constructor(private http: HttpClient) { }

  async getFutureHistory(futureId: number, from: number | null = null, to: number | null = null) {
    const jwt = sessionStorage.getItem("jwt");

    if(!jwt) return [];

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });

    let query = "?";

    if(from !== null) {
      query += "timestampFrom=" + from;
    }

    if(to !== null) {
      if(query.length > 1) query += "&"
      query += "timestampTo=" + to;
    }

    let resp;

    try {
      resp = (await firstValueFrom(
        this.http.get(environment.marketService + `/market/listing/history/future/${futureId}` + query, {headers})
      )) as ListingHistory[];
    } catch (e) {
      return [];
    }
    return resp;
  }

  async getFutureById(futureId: number) : Promise<Future | null>{
    const jwt = sessionStorage.getItem("jwt");

    if(!jwt) return null;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });
    let resp;
    try {
      resp = (await firstValueFrom(
        this.http.get(environment.marketService + `/market/listing/future/${futureId}`, {headers})
      )) as Future;
    } catch (e) {
      return null;
    }

    return resp;
  }

  getFutures(): Observable<Future[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
    });

    return this.http.get<Future[]>(environment.marketService + '/market/listing/get/futures', {headers});
  }
}

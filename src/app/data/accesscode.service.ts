import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ServerResponse } from './serverresponse';
import { formatDate } from '@angular/common';
import { AccessCode } from './accesscode';
import { Util } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class AccessCodeService {

  constructor(
    public http: HttpClient,
    public util: Util
  ) { }

  public list() {
    return this.http.get(environment.server + "/a/accesscodes")
    .pipe(
      map((s: ServerResponse) => JSON.parse(atob(s.content)))
    )
  }

  public add(ac: AccessCode) {
    let params = this.util.params(ac)
    if (ac.expiration != null) {
      params = params.set("expiration", formatDate(ac.expiration, "E LLL dd HH:mm:ss UTC yyyy", "en-US", "UTC"))
    }
    return this.http.post(environment.server + "/a/accesscodes", params)
  }

  public update(ac: AccessCode) {
    let params = this.util.params(ac)
    if (ac.expiration != null) {
      params = params.set("expiration", formatDate(ac.expiration, "E LLL dd HH:mm:ss UTC yyyy", "en-US", "UTC"))
    }
    return this.http.put(environment.server + "/a/accesscodes/" + ac.code, params);
  }

  public delete(ac: string) {
    return this.http.delete(environment.server + "/a/accesscodes/" + ac);
  }
}

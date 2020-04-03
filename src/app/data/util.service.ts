import { HttpParams } from '@angular/common/http';

export class Util {

  constructor(
  ) { }

  public params(x) {
    let httpParams = new HttpParams();
    Object.keys(x).forEach(function (key) {
      if (typeof x[key] !== 'string') {
          httpParams = httpParams.append(key, JSON.stringify(x[key]));
      } else {
          httpParams = httpParams.append(key, x[key]);
      }
    });
    return httpParams;
  }

}

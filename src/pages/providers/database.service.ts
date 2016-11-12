import {Injectable} from "@angular/core";
import {Sql} from "./sql";

@Injectable()
export class DatabaseService {

  constructor(public _db: Sql) {
    this.get('location').then(val=> {
      if (!val) {
        this.set('location', '95134');
      }
    });
    this.get('timeFormat').then(val=> {
      if (!val) {
        this.set('timeFormat', '12');
      }
    });
    this.get('metric').then(val=> {
      if (!val) {
        this.set('metric', 'F');
      }
    });
  }

  set(key: string, value: string): Promise<boolean> {
    return this._db.set(key, value)
      .then(()=> true)
      .catch(err=> {
        console.error('[Error] Saving ' + key + ' - ' + JSON.stringify(err));
        return false;
      });
  }

  get(key: string): Promise<string> {
    return this._db.get(key)
      .then(value=> {
        if (value) {
          return value;
        } else {
          throw new Error('Undefined value');
        }
      })
      .catch(err=> {
        console.error('[Error] Getting ' + key + ' - ' + JSON.stringify(err));
        return null;
      });
  }

  getJson(key: string): Promise<any> {
    return this.get(key).then(value => {
      try {
        return JSON.parse(value);
      } catch (err) {
        console.warn('Storage getJson(): unable to parse value for key', key, ' as JSON');
        throw null; // rethrowing exception so it can be handled with .catch()
      }
    });
  }

  setJson(key: string, value: any): Promise<boolean> {
    try {
      return this.set(key, JSON.stringify(value));
    } catch (err) {
      return Promise.reject(false);
    }
  }
}

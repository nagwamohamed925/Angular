import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class CallapiService {
  
  constructor(private Http:Http) { }

  getid()
  {
return this.Http.get('https://jsonplaceholder.typicode.com/comments').map(result=>result.json());

  }

getemployees()
{
  return this.Http.get('http://159.122.174.142:31090/api/employee').map(result=>result.json());

}

getdocuments()
{
  return this.Http.get('http://159.122.174.142:31090/api/document').map(result=>result.json());

}

getmoderators()
{
  return this.Http.get('http://159.122.174.142:31090/api/moderator').map(result=>result.json());

}


}

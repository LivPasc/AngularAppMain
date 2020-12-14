import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }
  readonly BaseURI = 'https://localhost:44313/Users/authenticate';

  login(formData) {
    console.log("aici ajunge")
    return this.http.post(this.BaseURI, formData);
  }
}

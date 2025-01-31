import {HttpClient, HttpHeaders,  HttpParams} from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserToEdit } from '../model';
import { environment } from "../../../enviroment";
import {PopupService} from "../service/popup.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.baseUrl;

  private userToEdit: User | undefined;

  constructor(private http: HttpClient
             ) { }

  public getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl+"/user/getAll", {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    });
  }

  public deleteUser(email: string): Observable<any> {
    return this.http.delete(this.apiUrl + '/usesr' ,{
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    });
  }

  public addUser(userData: any): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    });
    return this.http.post<any>(`${this.apiUrl}/user/createUser`, userData, { headers });
  }

  public searchUser(position: string, email: string, firstName: string, lastName:string): Observable<any> {
    console.log('Search user: ', position, email, firstName, lastName);
    const params = new HttpParams().set('firstName', firstName).set('lastName', lastName).set('email',email).set('position',position);
    const jwt = localStorage.getItem('jwt');

    if (!jwt) {
      throw new Error('JWT not found in localStorage');
    }

    // Setting up the headers
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwt
    });

    return this.http.get(this.apiUrl + '/user/search' ,{ headers, params });
  }


  public getUserById(userId: number): Observable<User> {
    return this.http.get<User>(this.apiUrl + '/' + userId,{
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    });
  }

  public updateUser(user: {
    userId: number;
    email: string
    password: string;
    firstName: string;
    lastName: string;
    jmbg: string;
    position: string;
    phoneNumber: string;
    isActive: boolean;
  }): Observable<any> {
    return this.http.put<User>(this.apiUrl + '/user', user,{
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    });
  }

  public setUserToEdit(user: User): void {
    this.userToEdit = user;
    console.log('User to edit: ', this.userToEdit);
  }

  public getUserToEdit(): User | undefined {
    return this.userToEdit;
  }


  getUser(jwt: string | null): Observable<{name: string, lastName: string}> {
    let url = `${this.apiUrl}/user/getUser`;

    //ToDo: Da li treba autorizacija
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${localStorage.getItem("jwt")}`
    // });

    //ToDo: Da li treba metod PUT da bude, posto postoji body
    return this.http.put<{name: string, lastName: string}>(url, jwt, {});
  }
}

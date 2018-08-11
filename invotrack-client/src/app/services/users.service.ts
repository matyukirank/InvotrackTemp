import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrl = 'http://192.168.1.105:1739/usersApi/users';  // URL to web api

  constructor(private http: HttpClient) { }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** GET Users from the server */
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl)
      .pipe(
        catchError(this.handleError('getUsers', []))
      );
  }

  /** GET Users by id. Will 404 if id not found */
  getsUsers(id: String): Observable<any> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError<any>(`getsUsers id=${id}`))
    );
  }

  /** POST: add a new Users to the server */
  addUsers(Users: any): Observable<any> {
    return this.http.post<any>(this.usersUrl, Users, httpOptions).pipe(
      catchError(this.handleError<any>('addUsers'))
    );
  }

  /** DELETE: delete the Users from the server */
  deleteUsers(id: String): Observable<any> {
    const url = `${this.usersUrl}/${id}`;

    return this.http.delete<any>(url, httpOptions).pipe(
      catchError(this.handleError<any>('deleteUsers'))
    );
  }

  /** PUT: update the Users on the server */
  updateUsers(id: String, Users: any, ): Observable<any> {
    const url = `${this.usersUrl}/${id}`;

    return this.http.put(this.usersUrl, Users, httpOptions).pipe(
      catchError(this.handleError<any>('updateUsers'))
    );
  }
}

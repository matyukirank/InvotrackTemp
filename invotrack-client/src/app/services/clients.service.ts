import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private clientsUrl = 'http://192.168.1.102:1739/clientsApi/clients';  // URL to web api

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

  getClients(): Observable<any[]> {
    return this.http.get<any[]>(this.clientsUrl)
      .pipe(
        catchError(this.handleError('getClients', []))
      );
  }

  /** GET Clients by id. Will 404 if id not found */
  getsClients(id: String): Observable<any> {
    const url = `${this.clientsUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError<any>(`getsClients id=${id}`))
    );
  }

  /** POST: add a new Clients to the server */
  addClients(Clients: any): Observable<any> {
    return this.http.post<any>(this.clientsUrl, Clients, httpOptions).pipe(
      catchError(this.handleError<any>('addClients'))
    );
  }

  /** DELETE: delete the Clients from the server */
  deleteClients(id: String): Observable<any> {
    const url = `${this.clientsUrl}/${id}`;

    return this.http.delete<any>(url, httpOptions).pipe(
      catchError(this.handleError<any>('deleteClients'))
    );
  }

  /** PUT: update the Clients on the server */
  updateClients(id: String, Clients: any, ): Observable<any> {
    const url = `${this.clientsUrl}/${id}`;

    return this.http.put(this.clientsUrl, Clients, httpOptions).pipe(
      catchError(this.handleError<any>('updateClients'))
    );
  }
}

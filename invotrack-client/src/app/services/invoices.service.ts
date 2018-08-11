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
export class InvoicesService {
  private invoicesUrl = 'http://192.168.1.105:1739/invoicesApi/invoices';  // URL to web api

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

  /** GET Invoices from the server */
  getInvoices(): Observable<any[]> {
    return this.http.get<any[]>(this.invoicesUrl)
      .pipe(
        catchError(this.handleError('getInvoices', []))
      );
  }

  /** GET Invoices by id. Will 404 if id not found */
  getsInvoices(id: String): Observable<any> {
    const url = `${this.invoicesUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError<any>(`getsInvoices id=${id}`))
    );
  }

  /** POST: add a new Invoices to the server */
  addInvoices(Invoices: any): Observable<any> {
    return this.http.post<any>(this.invoicesUrl, Invoices, httpOptions).pipe(
      catchError(this.handleError<any>('addInvoices'))
    );
  }

  /** DELETE: delete the Invoices from the server */
  deleteInvoices(id: String): Observable<any> {
    const url = `${this.invoicesUrl}/${id}`;

    return this.http.delete<any>(url, httpOptions).pipe(
      catchError(this.handleError<any>('deleteInvoices'))
    );
  }

  /** PUT: update the Invoices on the server */
  updateInvoices(id: String, Invoices: any, ): Observable<any> {
    const url = `${this.invoicesUrl}/${id}`;

    return this.http.put(this.invoicesUrl, Invoices, httpOptions).pipe(
      catchError(this.handleError<any>('updateInvoices'))
    );
  }
}

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
export class ProductsService {
  private productsUrl = 'http://192.168.1.101:1739/productsApi/products';  // URL to web api

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

  /** GET Products from the server */
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.productsUrl)
      .pipe(
        catchError(this.handleError('getProducts', []))
      );
  }

  /** GET Products by id. Will 404 if id not found */
  getsProducts(id: String): Observable<any> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError<any>(`getsProducts id=${id}`))
    );
  }

  /** POST: add a new Products to the server */
  addProducts(Products: any): Observable<any> {
    return this.http.post<any>(this.productsUrl, Products, httpOptions).pipe(
      catchError(this.handleError<any>('addProducts'))
    );
  }

  /** DELETE: delete the Products from the server */
  deleteProducts(id: String): Observable<any> {
    const url = `${this.productsUrl}/${id}`;

    return this.http.delete<any>(url, httpOptions).pipe(
      catchError(this.handleError<any>('deleteProducts'))
    );
  }

  /** PUT: update the Products on the server */
  updateProducts(id: String, Products: any, ): Observable<any> {
    const url = `${this.productsUrl}/${id}`;

    return this.http.put(this.productsUrl, Products, httpOptions).pipe(
      catchError(this.handleError<any>('updateProducts'))
    );
  }
}

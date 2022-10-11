import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError, tap, switchMap} from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import StorageHelper from '../helpers/storage.helper';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private apiServices: ApiService, private dataService: DataService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    console.log('INTERCEPTOR!----', request.url)

    if (request.url.includes("/mirror/")) {
      let originalRequest = request
      
      request = request.clone({ 
          setHeaders: {
            Authorization: 'Bearer ' +  StorageHelper.getItem('session').token
          }
        })

        return next.handle(request).pipe(
          catchError( err => {
            console.log('Error!----', err)
          
            if (err instanceof  HttpErrorResponse && err.status === 401){
              console.log('Response ERROR')
              return this.expiredHadle(originalRequest, next)
             }

             return throwError( () => err)
          })
        )
    }
   
    return next.handle(request)


  }

  private expiredHadle(originalRequest: HttpRequest<unknown> ,  next: HttpHandler ){

    return this.apiServices.refreshToken().pipe(
      switchMap( (respuestaT)=> { //espera que se retorne un observable, actua sobre le pipe exterior (salto)
      
        StorageHelper.setItem('session', respuestaT)
      
        originalRequest = originalRequest?.clone({
          setHeaders: {
            Authorization: 'Bearer ' +  StorageHelper.getItem('session').token
          }
        })
        return next?.handle(originalRequest)
      })
    )
  }

}

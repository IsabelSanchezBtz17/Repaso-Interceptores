import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public session$: BehaviorSubject<any> = new BehaviorSubject <any> (undefined);
  public localStorage$: Observable <any>;

  constructor() { 

    this.localStorage$= this.session$.pipe(
      tap ( session =>{
        if (session) {
          console.log(session)
          localStorage.setItem('session', JSON.stringify(session))
        }
        
      })
    )
      this.localStorage$.subscribe();
  }
}

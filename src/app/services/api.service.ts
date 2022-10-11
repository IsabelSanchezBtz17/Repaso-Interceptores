import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import StorageHelper from '../libs/helpers/storage.helper';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post('http://ec2-18-116-97-69.us-east-2.compute.amazonaws.com:4001/api/login', {
      username,
      password
    });
  }

  searchPokemon(namePokemon: string): Observable<any> {
    return this.http.post('http://ec2-18-116-97-69.us-east-2.compute.amazonaws.com:4001/mirror/pokemon',
      {

        endpoint: 'pokemon/' +namePokemon

      }
    )


    /* return this.http.get('https://pokeapi.co/api/v2/pokemon/'+  namePokemon, {
       headers:{
         Authorization: 'Bearer' + this.getToken()
       }
     })*/

    /* return this.http.get('http://ec2-18-116-97-69.us-east-2.compute.amazonaws.com:4001/api/check', {
       headers:{
         Authorization: 'Bearer' + this.getToken()
       }
     })*/


  }
  /*getSession(opcion: string) {
    let seccion: any = JSON.parse(localStorage.getItem('session')!)
    if (opcion == 'username') return seccion.username
    return seccion.token;
  }

  checkStatus(): Observable<any> {
    // console.log('token', this.getSession('token'))
    return this.http.get('http://ec2-18-116-97-69.us-east-2.compute.amazonaws.com:4001/api/check', {
      headers: {
        Authorization: 'Bearer ' + this.getSession('token')
      }
    })
  } */

  refreshToken() {
    return this.http.post('http://ec2-18-116-97-69.us-east-2.compute.amazonaws.com:4001/api/refresh', {
      session: StorageHelper.getItem('session')
    })
  }

}

import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import StorageHelper from 'src/app/libs/helpers/storage.helper';
@Component({
  selector: 'app-uno',
  templateUrl: './uno.component.html',
  styleUrls: ['./uno.component.scss']
})

export class UnoComponent {

  public username: string = '';
  public password: string = '';

  constructor(private api: ApiService, private dataServices: DataService, private router: Router) { }



  login() {
    this.api.login(this.username, this.password).subscribe({
      next: resp => {
        StorageHelper.setItem('session', resp )
        this.router.navigate(['search'])
      }
    })
  }



}

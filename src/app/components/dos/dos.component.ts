import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-dos',
  templateUrl: './dos.component.html',
  styleUrls: ['./dos.component.scss']
})
export class DosComponent implements OnInit {

  public pokemon$!: Observable<any>;
  public namePokemon = '';

  constructor(private apiServices: ApiService) {

    this.pokemon$= apiServices.searchPokemon('pikachu').pipe(
      tap ( console.log)
    )

   }

  ngOnInit(): void {
    
  }

  onChange(){
    //console.log(this.namePokemon)
    this.pokemon$= this.apiServices.searchPokemon(this.namePokemon).pipe(
      tap ( console.log)
    )
  }


}

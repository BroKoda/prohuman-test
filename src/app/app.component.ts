import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators'
import { RandomPerson } from './model/randomPeople';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'prohuman-test';
  randomPeople: RandomPerson[] = []
  gyoztunk: object;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getRandomPeople();
  }

  private getRandomPeople() {
    this.http.get<{[key: string]: RandomPerson}>('https://randomuser.me/api/?results=50')
      .pipe(map((res) => {
        const randomPeople = [];
        for (const key in res) {
          if(res.hasOwnProperty(key)){
            randomPeople.push({...res[key], id: key})
          }
        }
        return randomPeople;
      }))
      .subscribe((randomPeople) => {
        this.randomPeople = randomPeople;
        console.log(this.randomPeople)
    })
  }
}

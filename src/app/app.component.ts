import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {map, toArray} from 'rxjs/operators'
import { RandomPerson } from './model/randomPeople';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'prohuman-test';
  randomPeople: RandomPerson[] = []
  page: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getRandomPeople();
  }

  private getRandomPeople() {
    // Csak azert van kommentben az URL-es hivas, mert 10-bol 8 alkalommal nem tolt be :)
    // this.http.get<{[key: string]: RandomPerson}>('https://randomuser.me/api/?results=500')
    this.http.get<{[key: string]: RandomPerson}>('../assets/randomPeople.json')
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
    })
  }

  checkForPrimeNumbersInPostcode(postcode) {
    let numberString = postcode.toString();
    let numbersOnly = [];
    let primeNumbers = 0;

    // POSTCODE betuk kizarasa az egyenletbol
    for (let i = 0; i < numberString.length; i++) {
      if (!Number.isNaN(parseInt(numberString.charAt(i)))) {
        numbersOnly.push(parseInt(numberString.charAt(i)));
      }
    }

    // Mennyi prim szam talalhato a szamok kozott?
    for (let i = 0; i < numbersOnly.length; i++) {

      // A nulla nem prim szam
      if (numbersOnly[i] !== 0 ){
        let primeNumberHelper = 0

        // j nem 1-tol indul, mert minden szam oszthato 1-el
        // ha van osztoja a szamnak, akkor az a szam felenel mindig kisebb
        for (let j = 2; j <= numbersOnly[i]/2; j++) {
          if (numbersOnly[i] % j === 0) {
            primeNumberHelper += 1;
          }
        }

        // Ha a Helper 0 akkor csak magaval oszthato a szam
        if (primeNumberHelper === 0) {
          primeNumbers += 1;
        }
      }
    }

    // ha legalabb 2 prim szam van akkor megjelenik a template
    if (primeNumbers > 1) {
      return true;
    } else {
      return false;
    }
  }
}

export interface RandomPerson {
  name : {
    first: string;
    last: string;
  }
  location: {
    country: string;
    postcode: number;
  }
  gender: string;
  dob: {
    age: number;
  }
  picture: {
    thumbnail: string;
  }
}

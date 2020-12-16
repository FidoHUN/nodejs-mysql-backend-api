import { conn } from '../app.js';

const SELECT_PROPERTIES_QUERY_PART = `SELECT nev,kep,leiras,ar,mennyiseg,helyszin,telefonosElerhetoseg,feladasDatuma FROM jofogas.termek`;
const SELECT_FILTER = `WHERE aktiv=1`;

export default class Product {
  constructor(productItem) {
    this.name = productItem.name;
    this.image = productItem.image;
    this.description = productItem.description;
    this.price = productItem.price;
    this.quantity = productItem.quantity;
    this.location = productItem.location;
    this.phoneNumber = productItem.phoneNumber;
    this.postDate = productItem.postDate;
  }
  // static sayHello() {
  //   console.log('Hello World!');
  // }
  static getAllProductItems(res) {
    conn.query(
      `${SELECT_PROPERTIES_QUERY_PART} ${SELECT_FILTER}`,
      function (err, result) {
        if (err) {
          console.log('Error: ', err);
          res(err, null);
        } else {
          res(null, result);
        }
      }
    );
  }
}

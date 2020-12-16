import Product from '../models/product-model.js';

export function read_all_product_items(req, res) {
  Product.getAllProductItems(function (err, product) {
    if (err) {
      res.status(400).send(err);
      return;
    } else {
      res.json({ product });
      return;
    }
  });
}

import config from '../config.js';
import { read_all_product_items } from '../controllers/product-controller.js';

export default function (router) {
  router.get('/nullproduct', read_all_product_items);
}

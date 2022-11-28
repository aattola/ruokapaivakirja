import { SRuokaItem } from './../types/s-kaupat.d';
import { KRuokaProduct } from './../types/k-ruoka.d';
import { Product } from './../types/general.d';
import { KRuokaResponse } from "../types/k-ruoka";
import { SKaupatResponse } from "../types/s-kaupat";

function convertProduct(from: KRuokaProduct | SRuokaItem) {
  const kProduct = from as KRuokaProduct
  const sProduct = from as SRuokaItem

  if (sProduct.consumerPackageSize) {
    // s-mafian tuote

const returnVal: Product = {
  nutrition: {

  },
  ean: '',
  name: '',
  imageUrl: '',
  id: '',
  from: 'k'
}
    return
  }

if (kProduct.data.getProducts)
}

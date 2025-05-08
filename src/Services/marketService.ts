import { Product } from "../Models/product";
import { readJson, writeJson } from "../Utils/utils";

export default class MarketService {

  public getAllProducts(): Product[] {
    const rooms: Product[] = readJson("products.json");
    return rooms;
  }

  public getProductById(id: number): Product | null {
    const rooms: Product[] = this.getAllProducts();
    const filteredRooms = rooms.filter((p) => p.id === id);
    if (filteredRooms.length > 0) {
      return filteredRooms[0];
    } else {
      return null;
    }
  }

  public addProduct({ name, price, quantity = 1, vat = 22 }: { name: string; price: number; quantity?: number; vat?: number }): Product {
    let products = this.getAllProducts();
    const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    let newProduct: Product = {
      id: newId,
      name: name,
      price: parseFloat(price.toFixed(2)),
      quantity: quantity ?? 1,
      discount: 0,
      vat: vat,
      subtotal: parseFloat((price * (quantity ?? 1) * (1 + vat / 100)).toFixed(2)),
    };
    if ((newProduct.quantity ?? 1) >= 3) {
      newProduct = this.set3x2Discount(newProduct);
    }

    products.push(newProduct);
    this.setBundleDiscount(products);
    this.saveProducts(products);
    return newProduct
  }

  public deleteProduct(id: number) {
    const products = this.getAllProducts();
    // trova l'indice del prodotto da eliminare
    const index = products.findIndex((p) => p.id === id);
    // se il prodotto esiste, lo elimina
    if (index !== -1) {
      products.splice(index, 1);
      this.saveProducts(products);
      return true;
    }
    // se il prodotto non esiste, restituisce false
    return false;
  }

  public updateProduct(product: Product | null): Product | null {
    if (product != null) {
      const products = this.getAllProducts();
      // trova l'indice del prodotto da aggiornare
      const index = products.findIndex((p) => p.id === product.id);
      // se il prodotto esiste, lo aggiorna
      if (index !== -1) {
        products[index] = product;
        // aggiorna il subtotal
        product.subtotal = product.price * (product.quantity ?? 1) * (1 + (product.vat ?? 22) / 100);
        // se la quantità è >= 3 applica lo sconto 3x2
        if ((product.quantity ?? 1) >= 3) {
          product = this.set3x2Discount(product);
        }
        this.saveProducts(products);
        return product;
      }
    }
    return null;
  }

  public clearCart() {
    const products: Product[] = [];
    this.saveProducts(products);
  }

  public setDiscount(amount: number, isPercent: boolean = false) {
    // HACK FIXME: lo sconto fisso è un articolo dummy preceduto da un underscore
    if (isPercent) {
      this.addProduct({name: "_SCONTO_PCT", price: -amount});
    } else {
      this.addProduct({name: "_SCONTO", price: -amount});
    }
  }

  public set3x2Discount(p: Product): Product {
    p.quantity = p.quantity ?? 1;
    p.subtotal = p.subtotal ?? p.price * p.quantity;
    if (p.quantity >= 3) {
      p.discount = Math.floor(p.quantity / 3) * p.price;
      p.subtotal -= p.discount;
      this.updateProduct(p);
    }
    return p;
  }

  public setPercDiscount(pct: number) {
    // calcolla prima il totale
    const products: Product[] = this.getAllProducts();
    const total = products.reduce((acc, product) => acc + product.subtotal, 0);
    // se il totale è < 100 non applica lo sconto
    if (total < 100) {
      return;
    }
    // calcola lo sconto
    const discount = (total * pct) / 100;
    // aggiungi lo sconto come prodotto
    this.setDiscount(discount, true);
  }

  private setBundleDiscount(products: Product[]) {
    const hasMela = products.some((p) => p.name === "Mela");
    const hasBanana = products.some((p) => p.name === "Banana");
    const hasArancia = products.some((p) => p.name === "Arancia");
    const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    if (hasMela && hasBanana && hasArancia) {
      // FIXME non funziona per quantità > 1
      const bundleDiscount = 8;
      // imposta a 0 il subtotal e prezzo dei prodotti con name Mela, Banana e Arancia
      products
        .filter((p) => ["Mela", "Banana", "Arancia"].includes(p.name))
        .forEach((p) => {
          p.subtotal = 0;
          p.price = 0;
        });
      const bundleProduct: Product = {
        id: newId + 1,
        name: "Bundle Macedonia",
        price: bundleDiscount,
        quantity: 1,
        discount: 0,
        subtotal: bundleDiscount,
      };
      products.push(bundleProduct);
    }
  }

  private saveProducts(products: Product[]) {
    writeJson(products, "products.json");
  }
}

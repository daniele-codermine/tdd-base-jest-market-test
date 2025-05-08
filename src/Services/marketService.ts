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
  
  public addProduct(name: string, price: number) : Product {
    const products = this.getAllProducts();
    const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    const newProduct: Product = {
      id: newId,
      name: name,
      price: price,
    };
    products.push(newProduct);
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

  private saveProducts(products: Product[]) {
    writeJson(products, "products.json");
  }
}

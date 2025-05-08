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

  private saveProducts(products: Product[]) {
    writeJson(products, "products.json");
  }
}

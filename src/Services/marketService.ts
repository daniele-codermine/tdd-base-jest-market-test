import { Product } from "../Models/product";
import { readJson } from "../Utils/utils";

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
}

import { Product } from "../Models/product";
import { ProductActive } from "../Models/productactive";
import { readJson } from "../Utils/utils";
import { writeJson } from "../Utils/utils";

export default class MarketService {
  public getAllProducts(): Product[] {
    const rooms: Product[] = readJson("products.json");
    return rooms;
  }

  public getAllActiveProducts(): ProductActive[] {
    const products: ProductActive[] = readJson("products_active.json");
    return products;
  }

  public getProductActiveById(id: number): ProductActive | null {
    const rooms: ProductActive[] = this.getAllActiveProducts();
    const filteredRooms = rooms.filter((p) => p.id === id);
    if (filteredRooms.length > 0) {
      return filteredRooms[0];
    } else {
      return null;
    }
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

  public insertProduct(id: number, name: string, price: number): Product | null {
   var  product = this.getProductById(id);
    if(product == null){
      //insert
      console.log("product not exist");
      const productToInsert: Product = {
        id: id,
        name: name,
        price: price    
      };
      const allProduct: Product[] = this.getAllProducts();
      allProduct.push(productToInsert);
      return this.insertInJsonFile(allProduct, productToInsert);
    } else{
      return null;
    }
  }

public insertInJsonFile(data: Product[], dataToInsert: Product):  Product | null {
  console.log("insert product");
  const insert: Boolean =  
    writeJson (data, "products.json");
    if(insert) return dataToInsert; 
    else return null;
} 
public deleteProductById(id: number): Product | null {
    var  product = this.getProductActiveById(id);
     if(product == null){
       //insert
       console.log("deleteProductById");
       return product; 
     } else{
       product.active="N";
       const value:number = id;
       //this.deleteProduct(this.getAllActiveProducts(), value);
       return product;
     }
    
   }

   public deleteProduct<T>(elements: T[], value: T):  T[] {
    const index = elements.indexOf(value);
     if (index !== -1) {
      elements.splice(index, 1);
    }
    return elements;
}

 }


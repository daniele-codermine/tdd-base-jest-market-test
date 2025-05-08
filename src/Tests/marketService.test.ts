import { expect, it, test } from "@jest/globals";
import marketService from '../Services/marketService.ts';
import { Product } from "../Models/product.ts";

it('Test Caricamento Banana', () => {
    var service = new marketService();
    var product = service.getProductById(1);
    expect(product).not.toBeNull();
	expect(product?.id).toBe(1);
    expect(product?.name).toBe("Banana");
	expect(product?.price).toBe(2);
  });

  test.each([
    [
        4,
       "Prodotto Quattro", 
       4
    ],
    [
        6,
       "Prodotto Sei", 
       6
    ]


]) ('Aggiunta di un prodotto con prezzo fisso', (id, name, price) => {
    var service = new marketService();
    expect((service.insertProduct(id, name, price))?.id).not.toBeNull();
  });

  test.each([
    [
        1,
       "Banana", 
       1,
       "Y"
    ]
    

]) ('Cancellazione di un prodotto', (id) => {
    var service = new marketService();
    var product = service.deleteProductById(id);
    expect(product?.id).not.toBeNull();
  });
import {expect, it} from '@jest/globals';
import marketService from '../Services/marketService.ts';

it('Test Caricamento Banana', () => {
    var service = new marketService();
    var product = service.getProductById(1);
    expect(product).not.toBeNull();
	expect(product?.id).toBe(1);
    expect(product?.name).toBe("Banana");
	expect(product?.price).toBe(2);
  });

// Aggiunta singolo prodotto con prezzo fisso
it('Test Aggiunta Prodotto Singolo', () => {
    var service = new marketService();
    var product = service.addProduct("Banana", 2);
    expect(product).not.toBeNull();
    expect(product?.name).toBe("Banana");
    expect(product?.price).toBe(2);
    // id non deve essere null
    expect(product?.id).not.toBeNull();
    // id deve essere un numero
    expect(typeof product?.id).toBe("number");
    // id deve essere maggiore di 0
    expect(product?.id).toBeGreaterThan(0);
  });

  // Aggiunta di due prodotti con prezzi diversi
it('Test Aggiunta due prodotti distinti', () => {
    var service = new marketService();
    var bananaProduct = service.addProduct("Banana", 2);
    var appleProduct = service.addProduct("Mela", 3);
    expect(bananaProduct).not.toBeNull();
    expect(appleProduct).not.toBeNull();
    expect(bananaProduct?.name).toBe("Banana");
    expect(bananaProduct?.price).toBe(2);
    expect(appleProduct?.name).toBe("Mela");
    expect(appleProduct?.price).toBe(3);
    // id non deve essere null
    expect(bananaProduct?.id).not.toBeNull();
    expect(appleProduct?.id).not.toBeNull();
    // i due id devono essere distinti
    expect(bananaProduct?.id).not.toBe(appleProduct?.id);
    // id deve essere un numero
    expect(typeof bananaProduct?.id).toBe("number");
    expect(typeof appleProduct?.id).toBe("number");
    // id deve essere maggiore di 0
    expect(bananaProduct?.id).toBeGreaterThan(0);
});

// Cancellazione di un prodotto
it('Test Cancellazione Prodotto', () => {
    var service = new marketService();
    var addedProduct = service.addProduct("Preservativi", 10.23);
    service.deleteProduct(addedProduct?.id);
    var product = service.getProductById(addedProduct?.id);
    expect(product).toBeNull();
});
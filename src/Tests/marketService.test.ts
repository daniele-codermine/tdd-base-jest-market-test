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
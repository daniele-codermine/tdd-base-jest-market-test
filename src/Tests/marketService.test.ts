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

// Modifica della quantità di un prodotto già inserito
it('Test Modifica quantità Prodotto', () => {
    var service = new marketService();
    var addedProduct = service.addProduct("Banana", 2);
    // expectations "extra" per consentire di lanciare il test separatamente dagli altri
    var product = service.getProductById(addedProduct?.id);
    expect(product).not.toBeNull();
    expect(product?.name).toBe("Banana");
    expect(product?.price).toBe(2);
    // modifica della quantità del prodotto
    product!.price = 2.99;
    var updatedProduct = service.updateProduct(product);
    expect(updatedProduct).not.toBeNull();
    expect(updatedProduct?.name).toBe("Banana");
    expect(updatedProduct?.price).toBe(2.99);
});

// Gestione prezzi con i decimali
it('Test Aggiunta Prodotto con Prezzo Decimale', () => {
    var service = new marketService();
    var product = service.addProduct("Bikini", 15.67);
    expect(product).not.toBeNull();
    expect(product?.name).toBe("Bikini");
    expect(product?.price).toBe(15.67);
    // id non deve essere null
    expect(product?.id).not.toBeNull();
    // id deve essere un numero
    expect(typeof product?.id).toBe("number");
    // id deve essere maggiore di 0
    expect(product?.id).toBeGreaterThan(0);
});

// Modalità sconto fisso
it('Test Sconto Fisso', () => {
    var service = new marketService();
    // svuota il carrello
    service.clearCart();
    // aggiungi due prodotti
    var product1 = service.addProduct("Perizoma", 15.67);
    var product2 = service.addProduct("Culotte", 25.99);
    // recupera tutti i prodotti
    var products = service.getAllProducts();
    // calcola il totale iterando su products e sommando i price
    var total = 0;
    products.forEach((product) => {
        total += product.price;
    });
    expect(total).toBe(41.66);
    // applica lo sconto fisso di 5 euro
    service.setDiscount(5);
    // calcola il totale con lo sconto
    var discountedTotal = 0;
    var products = service.getAllProducts();
    products.forEach((product) => {
        discountedTotal += product.price;
    });
    expect(discountedTotal).toBe(36.66);
});
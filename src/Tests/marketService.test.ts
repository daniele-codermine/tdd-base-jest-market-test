import {expect, it} from '@jest/globals';
import marketService from '../Services/marketService.ts';

it('Test Caricamento Banana', () => {
    var service = new marketService();
    service.clearCart();
    // aggiungi un prodotto
    service.addProduct("Banana", 2);
    var product = service.getProductById(1);
    expect(product).not.toBeNull();
	expect(product?.id).toBe(1);
    expect(product?.name).toBe("Banana");
	expect(product?.price).toBe(2);
    expect(product?.subtotal).toBe(2);
    expect(product?.quantity).toBe(1);
  });

// Aggiunta singolo prodotto con prezzo fisso
it('Test Aggiunta Prodotto Singolo', () => {
    var service = new marketService();
    var product = service.addProduct("Banana", 2);
    expect(product).not.toBeNull();
    expect(product?.name).toBe("Banana");
    expect(product?.price).toBe(2);
    expect(product?.subtotal).toBe(2);
    expect(product?.quantity).toBe(1);
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
    expect(bananaProduct?.subtotal).toBe(2);
    expect(bananaProduct?.quantity).toBe(1);
    expect(appleProduct?.name).toBe("Mela");
    expect(appleProduct?.price).toBe(3);
    expect(appleProduct?.subtotal).toBe(3);
    expect(appleProduct?.quantity).toBe(1);
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
    expect(product?.subtotal).toBe(2);
    expect(product?.quantity).toBe(1);
    // modifica della quantità del prodotto
    product!.quantity = 2;
    var updatedProduct = service.updateProduct(product);
    expect(updatedProduct).not.toBeNull();
    expect(updatedProduct?.name).toBe("Banana");
    expect(updatedProduct?.quantity).toBe(2);
    expect(updatedProduct?.subtotal).toBe(4);
});

// Gestione prezzi con i decimali
it('Test Aggiunta Prodotto con Prezzo Decimale', () => {
    var service = new marketService();
    var product = service.addProduct("Bikini", 15.67);
    expect(product).not.toBeNull();
    expect(product?.name).toBe("Bikini");
    expect(product?.price).toBe(15.67);
    expect(product?.subtotal).toBe(15.67);
    expect(product?.quantity).toBe(1);
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
    var product1 = service.addProduct("Perizoma", 15.67, 2); // 31.34
    var product2 = service.addProduct("Culotte", 25.99, 2); // 51.98
    // recupera tutti i prodotti
    var products = service.getAllProducts();
    // calcola il totale iterando su products e sommando i price
    var total = 0;
    products.forEach((product) => {
        total += product.subtotal;
    });
    expect(total).toBe(83.32);
    // applica lo sconto fisso di 5 euro
    service.setDiscount(5);
    // calcola il totale con lo sconto
    var discountedTotal = 0;
    var products = service.getAllProducts();
    products.forEach((product) => {
        discountedTotal += product.subtotal;
    });
    expect(discountedTotal).toBe(78.32);
});

// Modalità sconto percentuale
it('Test Sconto Percentuale', () => {
    var service = new marketService();
    // svuota il carrello
    service.clearCart();
    // aggiungi due prodotti
    var product1 = service.addProduct("Tanga", 10, 2);
    var product2 = service.addProduct("Carne", 20);
    var product3 = service.addProduct("Pecorino", 20, 2);
    var product4 = service.addProduct("Mozzarella", 30);
    var product5 = service.addProduct("Slinzega", 21, 2);
    // recupera tutti i prodotti
    var products = service.getAllProducts();
    // calcola il totale iterando su products e sommando i price
    var total = 0;
    products.forEach((product) => {
        total += product.subtotal;
    });
    expect(total).toBe(152);
    // applica lo sconto percentuale del 10%
    service.setPercDiscount(10);
    // calcola il totale con lo sconto
    var discountedTotal = 0;
    var products = service.getAllProducts();
    products.forEach((product) => {
        discountedTotal += product.subtotal
    });
    expect(discountedTotal).toBe(136.8);
});

// 3x2: Acquistando 3 prodotti, ne verrà scontato 1.
it('Test Sconto 3x2', () => {
    var service = new marketService();
    // svuota il carrello
    service.clearCart();
    // aggiungi tre prodotti
    var product1 = service.addProduct("Tanga", 10, 2);
    var product2 = service.addProduct("Carne", 20, 5);
    var product3 = service.addProduct("Pecorino", 20, 9);
    // recupera tutti i prodotti
    var products = service.getAllProducts();
    // verifica che il totale di product1 sia 20
    var total = 0;
    // cerca in product il prodotto con product1.id
    var product = products.find((p) => p.id === product1?.id);
    // verifica che lo sconto sia 0
    expect(product?.discount).toBe(0);
    // cerca in product il prodotto con product2.id
    var product = products.find((p) => p.id === product2?.id);
    // verifica che lo sconto sia 3x2 ovvero sui 5 pezzi, 1 non viene pagato
    expect(product?.discount).toBe(20);
    // cerca in product il prodotto con product3.id
    var product = products.find((p) => p.id === product3?.id);
    // verifica che lo sconto sia 3x2 ovvero sui 9 pezzi, 3 non vengono pagati
    expect(product?.discount).toBe(60);
});

// Modalità "Bundle": Acquistando, ad esempio, una mela (3€), una banana (2€) ed una arancia (5€) verrà applicato il prezzo bundle "Macedonia" di 8€
it('Test Sconto Bundle', () => {
    var service = new marketService();
    // svuota il carrello
    service.clearCart();
    // aggiungi tre prodotti
    var product1 = service.addProduct("Mela", 4);
    var product2 = service.addProduct("Banana", 3);
    var product3 = service.addProduct("Arancia", 5);
    // recupera tutti i prodotti
    var products = service.getAllProducts();
    // calcola il totale iterando su products e sommando i price
    var total = 0;
    products.forEach((product) => {
        total += product.subtotal;
    });
    expect(total).toBe(8);
});
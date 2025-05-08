import { expect, it } from '@jest/globals';
import marketService from '../Services/marketService.ts';

it('Test Caricamento Banana', () => {
    var service = new marketService();
    var product = service.getProductById(1);
    expect(product).not.toBeNull();
    expect(product?.id).toBe(1);
    expect(product?.name).toBe("Banana");
    expect(product?.price).toBe(2);
});

it('Test Caricamento Mela', () => {
    var service = new marketService();
    var product = service.getProductById(2);
    expect(product).not.toBeNull();
    expect(product?.id).toBe(2);
    expect(product?.name).toBe("Mela");
    expect(product?.price).toBe(3);
});

it('Test Caricamento Arancia', () => {
    var service = new marketService();
    var product = service.getProductById(3);
    expect(product).not.toBeNull();
    expect(product?.id).toBe(3);
    expect(product?.name).toBe("Arancia");
    expect(product?.price).toBe(5);
});

/* Aggiunta singolo prodotto con prezzo fisso
Aggiunta di due prodotti con prezzi diversi
Cancellazione di un prodotto
Modifica della quantità di un prodotto già inserito
Gestione prezzi con i decimali
*/

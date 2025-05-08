import { expect, it, describe, xdescribe } from '@jest/globals';
import { RegisterService } from "../Services/registerService";
import { CartItem } from "../Models/cartItem";
import MarketService from '../Services/marketService';

/*
3x2: Ogni 3 prodotti acquistati, uno sarà gratuito 1.
Modalità "Bundle": Acquistando, ad esempio, una mela (3€), una banana (2€) ed una arancia (5€) verrà applicato il prezzo bundle "Macedonia" di 8€W
*/

describe('Test RegisterService', () => {
    it('Test Aggiunta singolo prodotto con prezzo fisso', () => {
        const service = new RegisterService();
        const marketService = new MarketService();
        const item = marketService.getProductById(1);
        const id = service.getCartItems().length + 1;
        const cartItem: CartItem = {
            id: id,
            product: item!,
            quantity: 1
        };
        expect(cartItem.quantity).toBe(1);

        service.addToCart(cartItem);
        const cartItems = service.getCartItems();
        const totalPrice = service.getTotalPrice();

        expect(cartItems.length).toBe(1);
        expect(totalPrice).toBe(item!.price * cartItem.quantity);
    });

    it('Test Aggiunta di due prodotti con prezzi diversi', () => {
        const service = new RegisterService();
        const marketService = new MarketService();
        var currentCartItems = service.getCartItems().length;
        const firstItemId = 1;
        const secondItemId = 2;
        const item1 = marketService.getProductById(firstItemId);
        const item2 = marketService.getProductById(secondItemId);
        const cartItem1: CartItem = {
            id: currentCartItems++,
            product: item1!,
            quantity: 1
        };
        service.addToCart(cartItem1);

        currentCartItems = service.getCartItems().length;
        const id2 = currentCartItems++;
        const cartItem2: CartItem = {
            id: id2,
            product: item2!,
            quantity: 1
        };

        service.addToCart(cartItem2);

        const cartItems = service.getCartItems();
        expect(cartItem1.quantity).toBe(1);
        expect(cartItem2.quantity).toBe(1);
        expect(cartItems.length).toBe(2);

        const totalPrice = service.getTotalPrice();
        const item1Price = item1!.price * cartItem1.quantity;
        const item2Price = item2!.price * cartItem2.quantity;
        expect(totalPrice).toBe(item1Price + item2Price);
    });

    it('Test Cancellazione di un prodotto', () => {
        const service = new RegisterService();
        const marketService = new MarketService();
        var currentCartItems = service.getCartItems().length;
        expect(currentCartItems).toBe(0);

        const itemId = 1;
        const item1 = marketService.getProductById(itemId);
        const cartItem1: CartItem = {
            id: currentCartItems++,
            product: item1!,
            quantity: 1
        };
        service.addToCart(cartItem1);

        currentCartItems = service.getCartItems().length;
        expect(currentCartItems).toBe(1);

        service.removeFromCart(cartItem1.id);

        currentCartItems = service.getCartItems().length;
        expect(currentCartItems).toBe(0);

        const totalPrice = service.getTotalPrice();
        expect(totalPrice).toBe(0);
    });

    it('Test Modifica della quantità di un prodotto già inserito', () => {
        const service = new RegisterService();
        const marketService = new MarketService();
        var currentCartItems = service.getCartItems().length;
        expect(currentCartItems).toBe(0);

        const itemId = 1;
        const item = marketService.getProductById(itemId);
        const cartItem1: CartItem = {
            id: currentCartItems++,
            product: item!,
            quantity: 1
        };
        service.addToCart(cartItem1);

        currentCartItems = service.getCartItems().length;
        expect(currentCartItems).toBe(1);
        expect(cartItem1.quantity).toBe(1);
        var totalPrice = service.getTotalPrice();
        expect(totalPrice).toBe(item!.price * cartItem1.quantity);

        service.editCartItemQuantity(cartItem1.id, 2);
        expect(cartItem1.quantity).toBe(2);

        totalPrice = service.getTotalPrice();
        expect(totalPrice).toBe(item!.price * cartItem1.quantity);
    });

    it('Test Gestione prezzi con i decimali', () => {
        const service = new RegisterService();
        const marketService = new MarketService();
        var currentCartItems = service.getCartItems().length;
        expect(currentCartItems).toBe(0);

        const itemId = 4;
        const item = marketService.getProductById(itemId);
        const cartItem1: CartItem = {
            id: currentCartItems++,
            product: item!,
            quantity: 2
        };
        service.addToCart(cartItem1);

        currentCartItems = service.getCartItems().length;
        expect(currentCartItems).toBe(1);
        expect(cartItem1.quantity).toBe(2);

        var totalPrice = service.getTotalPrice();
        expect(totalPrice).toBeCloseTo(item!.price * cartItem1.quantity, 2);
    });

    it('Test Sconto fisso applicato al totale', () => {
        const service = new RegisterService();
        const marketService = new MarketService();
        var currentCartItems = service.getCartItems().length;
        expect(currentCartItems).toBe(0);

        const itemId = 1;
        const item = marketService.getProductById(itemId);
        const cartItem1: CartItem = {
            id: currentCartItems++,
            product: item!,
            quantity: 4
        };
        service.addToCart(cartItem1);

        const itemId2 = 2;
        const item2 = marketService.getProductById(itemId2);
        const cartItem2: CartItem = {
            id: currentCartItems++,
            product: item2!,
            quantity: 2
        };
        service.addToCart(cartItem2);

        currentCartItems = service.getCartItems().length;
        expect(currentCartItems).toBe(2);
        expect(cartItem1.quantity).toBe(4);
        expect(cartItem2.quantity).toBe(2);

        var totalPrice = service.getTotalPrice();
        const item1Price = item!.price * cartItem1.quantity;
        const item2Price = item2!.price * cartItem2.quantity;
        expect(totalPrice).toBe(item1Price + item2Price);

        if (totalPrice >= 5) {
            service.applyFixedDiscount(5);
            totalPrice = service.getTotalPrice();
            expect(totalPrice).toBeCloseTo(item1Price + item2Price - 5, 2);
        }
    });

    it('Test Sconto percentuale applicato al totale', () => {
        const service = new RegisterService();
        const marketService = new MarketService();
        var currentCartItems = service.getCartItems().length;
        expect(currentCartItems).toBe(0);

        const itemId = 7;
        const item = marketService.getProductById(itemId);
        const cartItem1: CartItem = {
            id: currentCartItems++,
            product: item!,
            quantity: 1
        };
        service.addToCart(cartItem1);

        const itemId2 = 8;
        const item2 = marketService.getProductById(itemId2);
        const cartItem2: CartItem = {
            id: currentCartItems++,
            product: item2!,
            quantity: 1
        };
        service.addToCart(cartItem2);

        currentCartItems = service.getCartItems().length;
        expect(currentCartItems).toBe(2);
        expect(cartItem1.quantity).toBe(1);
        expect(cartItem2.quantity).toBe(1);

        var totalPrice = service.getTotalPrice();
        const item1Price = item!.price * cartItem1.quantity;
        const item2Price = item2!.price * cartItem2.quantity;
        expect(totalPrice).toBeCloseTo(item1Price + item2Price, 2);

        if (totalPrice >= 100) {
            service.applyPercentDiscount(10);
            totalPrice = service.getTotalPrice();
            expect(totalPrice).toBeCloseTo((item1Price + item2Price) - ((item1Price + item2Price) * 10) / 100, 2);
        }
    });

    it('Test Modalità 3x2', () => {
        const service = new RegisterService();
        const marketService = new MarketService();
        var currentCartItems = service.getCartItems().length;
        expect(currentCartItems).toBe(0);

        const itemId = 1;
        const item = marketService.getProductById(itemId);
        const cartItem1: CartItem = {
            id: currentCartItems++,
            product: item!,
            quantity: 9
        };
        service.addToCart(cartItem1);

        currentCartItems = service.getCartItems().length;
        expect(currentCartItems).toBe(1);
        expect(cartItem1.quantity).toBe(9);

        var totalPrice = service.getTotalPriceWithThreeForTwoDiscount();
        const item1Price = item!.price * cartItem1.quantity;
        const item1PriceWithDiscount = item!.price * Math.floor(cartItem1.quantity / 3);
        expect(totalPrice).toBeCloseTo(item1Price - item1PriceWithDiscount, 2);
    });

    it('Test Modalità Bundle', () => {
        const service = new RegisterService();
        const marketService = new MarketService();
        var currentCartItems = service.getCartItems().length;
        expect(currentCartItems).toBe(0);

        const itemId = 1;
        const item = marketService.getProductById(itemId);
        const cartItem1: CartItem = {
            id: currentCartItems++,
            product: item!,
            quantity: 1
        };
        service.addToCart(cartItem1);

        const itemId2 = 2;
        const item2 = marketService.getProductById(itemId2);
        const cartItem2: CartItem = {
            id: currentCartItems++,
            product: item2!,
            quantity: 1
        };
        service.addToCart(cartItem2);

        const itemId3 = 3;
        const item3 = marketService.getProductById(itemId3);
        const cartItem3: CartItem = {
            id: currentCartItems++,
            product: item3!,
            quantity: 1
        };
        service.addToCart(cartItem3);

        currentCartItems = service.getCartItems().length;
        expect(currentCartItems).toBe(3);
        expect(cartItem1.quantity).toBe(1);
        expect(cartItem2.quantity).toBe(1);
        expect(cartItem3.quantity).toBe(1);

        const totalPrice = service.getTotalPriceWithBundleDiscount();
        expect(totalPrice).toBe(8);
    });

});
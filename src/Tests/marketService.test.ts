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
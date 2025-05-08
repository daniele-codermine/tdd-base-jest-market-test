import { CartItem } from "../Models/cartItem";
import { Cart, PromotionType } from "../Models/cart";
import { ProductBundle } from "../Models/bundle";

export class RegisterService {
    private cart: Cart = {
        items: [],
        subtotalPrice: 0,
        discountPercent: null,
        fixedDiscount: null,
        totalPrice: 0,
        promotionType: PromotionType.NONE
    };

    public addToCart(item: CartItem): void {
        const existingItem = this.cart.items.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            this.cart.items.push(item);
        }
    }

    private updateCartPrice(): void {
        this.cart.subtotalPrice = this.cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
        this.cart.totalPrice = this.cart.subtotalPrice;
        switch (this.cart.promotionType) {
            case PromotionType.FIXED:
                this.cart.totalPrice = this.cart.subtotalPrice - (this.cart.fixedDiscount || 0);
                break;
            case PromotionType.PERCENTAGE:
                this.cart.totalPrice = this.cart.subtotalPrice - (this.cart.subtotalPrice * (this.cart.discountPercent || 0)) / 100;
                break;
            case PromotionType.THREE_FOR_TWO:
                this.applyThreeForTwoDiscount();
                break;
            case PromotionType.BUNDLE:
                this.applyBundleDiscount();
                break;
            case PromotionType.ALL:
                this.cart.totalPrice = this.cart.subtotalPrice - (this.cart.fixedDiscount || 0) - ((this.cart.subtotalPrice * (this.cart.discountPercent || 0)) / 100);
                this.applyThreeForTwoDiscount();
                this.applyBundleDiscount();
                break;
            default:
                this.cart.totalPrice = this.cart.subtotalPrice;
                break;
        }
    }

    public getCartItems(): CartItem[] {
        return this.cart.items;
    }

    public removeFromCart(itemId: number): void {
        this.cart.items = this.cart.items.filter((item) => item.id !== itemId);
        this.updateCartPrice();
    }

    public editCartItemQuantity(itemId: number, quantity: number): void {
        const item = this.cart.items.find((cartItem) => cartItem.id === itemId);
        if (item) {
            item.quantity = quantity;
            this.updateCartPrice();
        }
    }

    public applyFixedDiscount(discount: number): void {
        this.cart.fixedDiscount = discount;
        this.cart.promotionType = PromotionType.FIXED;
        this.updateCartPrice();
    }

    public applyPercentDiscount(discount: number): void {
        this.cart.discountPercent = discount;
        this.cart.promotionType = PromotionType.PERCENTAGE;
        this.updateCartPrice();
    }

    public getTotalPrice(): number {
        this.updateCartPrice();
        return this.cart.totalPrice;
    }

    public getTotalPriceWithThreeForTwoDiscount(): number {
        this.cart.promotionType = PromotionType.THREE_FOR_TWO;
        this.updateCartPrice();
        return this.cart.totalPrice;
    }

    public getTotalPriceWithBundleDiscount(): number {
        this.cart.promotionType = PromotionType.BUNDLE;
        this.updateCartPrice();
        return this.cart.totalPrice;
    }


    private applyThreeForTwoDiscount(): void {
        const threeForTwoItems = this.cart.items.filter((item) => item.product.threeForTwo);
        if (threeForTwoItems.length > 0) {
            const totalItems = threeForTwoItems.reduce((total, item) => total + item.quantity, 0);
            const discountItems = Math.floor(totalItems / 3);
            this.cart.totalPrice = this.cart.totalPrice - (discountItems * Math.min(...threeForTwoItems.map(item => item.product.price)));
        }
    }

    private applyBundleDiscount(): void {
        const bundle: ProductBundle = {
            name: "Macedonia",
            price: 8,
            productIds: [1, 2, 3]
        }
        const cartItemsIds = this.cart.items.map(item => item.product.id);
        
        var hasAllProductsInBundle = true;
        var cartItemsPriceToRemove = 0;
        var bundles = 0;

        for (const productId of bundle.productIds) {
            if (!cartItemsIds.includes(productId)) {
                hasAllProductsInBundle = false;
                break;
            }
        }
        if (hasAllProductsInBundle) {
            for (const item of this.cart.items) {
                if (bundle.productIds.includes(item.product.id)) {
                    cartItemsPriceToRemove += item.product.price * item.quantity;
                    bundles += item.quantity;
                }
            }
            bundles = Math.floor(bundles / bundle.productIds.length);
        }

        this.cart.totalPrice = this.cart.totalPrice - cartItemsPriceToRemove + (bundle.price * bundles);

    }
}
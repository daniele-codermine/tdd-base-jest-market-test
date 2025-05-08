import { CartItem } from "./cartItem";

export interface Cart {
    items: CartItem[];
    subtotalPrice: number;
    fixedDiscount: number | null;
    discountPercent: number | null;
    totalPrice: number;
    promotionType: PromotionType;
}

export enum PromotionType {
    NONE = 'none',
    FIXED = 'fixed',
    PERCENTAGE = 'percentage',
    THREE_FOR_TWO = '3x2',
    BUNDLE = 'bundle',
    ALL = 'all'
}
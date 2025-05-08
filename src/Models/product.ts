export interface Product {
  id: number;
  name: string;
  price: number;
  quantity?: number;
  discount?: number;
  subtotal?: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  threeForTwo: boolean;
  bundleId: number | null;
  vat: number;
}

export interface ProductActive {
  id: number;
  name: string;
  price: number;
  active: string;
}

function constructor(id: number, name: string, price: number, active: string) {
  this.id = id;
  this.name= name;
  this.price=price;
  this.active=active
}

export type Product = {
  id: number;
  batch_number: string;
  name: string;
  price: number;
  stock: number;
  entry_date: Date;
};
export type InvoiceItem = {
  ProductId: number;
  quantity: number;
  unit_price: number;
  total_price: number;
};
export type ProductsType = {
  products: Product[];
  shopingCart: InvoiceItem[];
  editingProduct:Product | null
};

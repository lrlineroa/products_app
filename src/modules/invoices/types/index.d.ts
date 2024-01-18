import { UserType } from "../../auth/types";
import { Product } from "../../products/types";

export type ProductWithInvoiceItems = Product & {
  InvoiceId: number;
  ProductId: number;
  quantity: number;
  unit_price: number;
  total_price: number;
};
export type Invoice = {
  id: number;
  total: number;
  subtotal: number;
  taxes: number;
  invoice_date: Date | null;
  UserId: number;
  Products: ProductWithInvoiceItems[];
  User: UserType;
};

export type InvoicesType = {
  invoices: Invoice[];
  currentInvoice:Invoice | {};
};


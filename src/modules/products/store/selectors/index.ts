import { useAppSelector } from "../../../../redux/hooks";

export const useProducts = ()=>useAppSelector(state=>state.products.products)
export const useIsShoppinCartEmpty= ()=>useAppSelector(state=>state.products.shopingCart.length === 0);
export const useShoppinCart= ()=>useAppSelector(state=>state.products.shopingCart);
export const useEditingProduct=()=>useAppSelector(state=>state.products.editingProduct);
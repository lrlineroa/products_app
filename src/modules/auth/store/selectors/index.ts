import { useAppSelector } from "../../../../redux/hooks";

export const useIsLoggedIn = ()=>useAppSelector(state=>state.auth.JWTToken !== null)
export const useIsAdmin=()=>useAppSelector(state=>state.auth.user?.UserRoleId===1);
export const useUserAuth=()=>useAppSelector(state=>state.auth.user);
export const useLoginIsLoading=()=>useAppSelector(state=>state.auth.loading);
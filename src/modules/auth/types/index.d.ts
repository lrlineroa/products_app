export type UserType={
    id:number;
    name:string;
    email:string;
    UserRoleId:number;
}
export type AuthType={
    user:UserType | null;
    JWTToken:string | null;
}
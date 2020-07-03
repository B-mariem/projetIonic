import { User } from 'src/app/interfaces/user';
export interface Product {
    id?: string;
    name?: string;
    description?: string;
    picture?: string;
    price?: number;
    createdAt?: number;
    userId?: string;
    adresse?:string,
    tel?:number,
    amount?:number,
    totalamount?:number,
    categorie?:string
}
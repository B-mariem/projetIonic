export interface Product {
    id?: string;
    name?: string;
    description?: string;
    picture?: string;
    price?: number;
    createdAt?: Date;
    userId?: string;
    etat?:string,
    adresse?:string,
    tel?:string,
    amount?:number,
    totalamount?:number
}
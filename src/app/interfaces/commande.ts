import { Product } from './product';

export interface Commande{
    id?:string,
    cart?: Product[],
    adressClient?:string,
    userName?:string,
    phoneClient?:string,
    type?:string,
    createdAt?: Date;
}
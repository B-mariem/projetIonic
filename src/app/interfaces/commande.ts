import { Product } from './product';

export interface Commande{
    id?:string,
    cart?: Product[],
    adressClient?:string,
    nameClient?:string,
    phoneClient?:string,
    idClient?:string,
    idProvider?:string,
    total?:number
    type?:string,
    createdAt?: any;
}
import { Resource } from './resource.interface';

export interface IAddress extends Resource {
    addressId: number;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: number;
    country: string;
    customerId: number;
}

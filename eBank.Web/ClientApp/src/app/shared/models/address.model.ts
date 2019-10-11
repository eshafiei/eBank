import { IAddress } from '../interfaces/address.interface';

export class Address implements IAddress {
    id: number;
    addressId: number;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: number;
    country: string;
    customerId: number;
}

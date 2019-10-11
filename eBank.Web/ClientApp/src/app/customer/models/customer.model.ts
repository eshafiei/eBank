import { ICustomer } from '../interfaces/customer.interface';

export class Customer implements ICustomer {
    id: number;
    customerId: number;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    legalStatus: number;
    maritalStatus: number;
    userId: string;
}

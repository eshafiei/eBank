import { Resource } from '../../shared/interfaces/resource.interface';

export interface ICustomer extends Resource {
    customerId: number;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    legalStatus: number;
    maritalStatus: number;
}

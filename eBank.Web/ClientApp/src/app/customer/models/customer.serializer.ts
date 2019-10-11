import { Serializer } from '../../shared/interfaces/serializer.interface';
import { ICustomer } from '../interfaces/customer.interface';
import { Customer } from './customer.model';


export class CustomerSerializer implements Serializer<ICustomer> {
    fromJson(json: any): Customer {
        const customer = new Customer();
        customer.id = json.id;
        customer.customerId = json.customerId;
        customer.firstName = json.firstName;
        customer.lastName = json.lastName;
        customer.dateOfBirth = json.dateOfBirth;
        customer.legalStatus = json.legalStatus;
        customer.maritalStatus = json.maritalStatus;
        return customer;
    }

    toJson(customer: Customer) {
        return {
            id: customer.id,
            customerId: customer.customerId,
            firstName: customer.firstName,
            lastName: customer.lastName,
            dateOfBirth: customer.dateOfBirth,
            legalStatus: customer.legalStatus,
            maritalStatus: customer.maritalStatus
        };
    }
}

import { Customer } from '../../customer/models/customer.interface';
import { Address } from '../../Customer/models/address.interface';

export interface CustomerViewModel {
    customer: Customer;
    address: Address;
}

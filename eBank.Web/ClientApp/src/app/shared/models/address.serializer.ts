import { Serializer } from '../../shared/interfaces/serializer.interface';
import { IAddress } from 'src/app/shared/interfaces/address.interface';
import { Address } from './address.model';


export class AddressSerializer implements Serializer<IAddress> {
    fromJson(json: any): Address {
        const address = new Address();
        address.id = json.id;
        address.addressId = json.addressId;
        address.address1 = json.address1;
        address.address2 = json.address2;
        address.city = json.city;
        address.state = json.state;
        address.zip = json.zip;
        address.country = json.country;
        address.customerId = json.customerId;
        return address;
    }

    toJson(address: Address) {
        return {
            id: address.id,
            addressId: address.addressId,
            address1: address.address1,
            address2: address.address2,
            city: address.city,
            state: address.state,
            zip: address.zip,
            country: address.country,
            customerId: address.customerId
        };
    }
}

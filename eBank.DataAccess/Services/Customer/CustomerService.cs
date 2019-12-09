using System.Linq;
using System.Threading.Tasks;
using eBank.DataAccess.Models;
using eBank.DataAccess.Models.Address;
using Microsoft.EntityFrameworkCore;

namespace eBank.DataAccess.Services.Customer
{
    public class CustomerService : ICustomerService
    {
        private readonly EBankContext _eBankContext;

        public CustomerService(EBankContext eBankContext)
        {
            _eBankContext = eBankContext;
        }

        public async Task<CustomerModel> GetCustomer(string userId)
        {
            return await _eBankContext.Customers
                             .Where(customer => customer.UserId == userId)
                             .FirstOrDefaultAsync();
        }        

        public async Task<int> UpdateCustomer(CustomerModel model)
        {
            var customer = _eBankContext.Customers.FirstOrDefault(c => c.CustomerId == model.CustomerId);
            if (customer == null)
            {
                return 0;
            }

            customer.FirstName = model.FirstName;
            customer.LastName = model.LastName;
            customer.DateOfBirth = model.DateOfBirth;
            customer.LegalStatus = model.LegalStatus;
            customer.MaritalStatus = model.MaritalStatus;
            return await _eBankContext.SaveChangesAsync();
        }

        public async Task<AddressModel> GetAddress(long customerId, long addressId)
        {
            var query = _eBankContext.Address
                                     .Where(address => address.CustomerId == customerId);
            if (addressId > 0)
            {
                query = query.Where(address => address.AddressId == addressId);
            }
            return await query.FirstOrDefaultAsync();
        }

        public async Task<int> UpdateAddress(AddressModel model)
        {
            var address = _eBankContext.Address.FirstOrDefault(a => a.CustomerId == model.CustomerId);
            if (address == null)
            {
                return 0;
            }

            address.Address1 = model.Address1;
            address.Address2 = model.Address2;
            address.City = model.City;
            address.State = model.State;
            address.Zip = model.Zip;
            address.Country = model.Country;
            return await _eBankContext.SaveChangesAsync();
        }
    }
}

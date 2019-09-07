using System.Linq;
using System.Threading.Tasks;
using eBank.DataAccess.ViewModels;
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

        public async Task<CustomerViewModel> GetCustomer(int customerId)
        {
            return await _eBankContext.Customers
                           .Join(_eBankContext.Address,
                              customer => customer.CustomerId,
                              address => address.CustomerId,
                              (customer, address) =>
                              new CustomerViewModel { Customer = customer, Address = address })
                           .Where(customerAndAddress => customerAndAddress.Customer.CustomerId == customerId)
                           .FirstOrDefaultAsync();
        }

        public async Task<int> UpdateCustomer(CustomerViewModel model)
        {
            var customer = _eBankContext.Customers.FirstOrDefault(c => c.CustomerId == model.Customer.CustomerId);
            if (customer != null)
            {
                customer.FirstName = model.Customer.FirstName;
                customer.LastName = model.Customer.LastName;
                customer.DateOfBirth = model.Customer.DateOfBirth;
                customer.LegalStatus = model.Customer.LegalStatus;
                customer.MaritalStatus = model.Customer.MaritalStatus;
            }
            var address = _eBankContext.Address.FirstOrDefault(a => a.CustomerId == model.Customer.CustomerId);
            if (address != null) {
                address.Address1 = model.Address.Address1;
                address.Address2 = model.Address.Address2;
                address.City = model.Address.City;
                address.State = model.Address.State;
                address.Zip = model.Address.Zip;
                address.Country = model.Address.Country;
            }
            return await _eBankContext.SaveChangesAsync();
        }
    }
}

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

        public async Task<CustomerViewModel> GetCustomer(string userId)
        {
            return await _eBankContext.Customers
                           .Join(_eBankContext.Address,
                              customer => customer.CustomerId,
                              address => address.CustomerId,
                              (customer, address) =>
                              new CustomerViewModel { Customer = customer, Address = address })
                           .Where(customerAndAddress => customerAndAddress.Customer.UserId == userId)
                           .FirstOrDefaultAsync();
        }

        public async Task<int> UpdateCustomer(CustomerViewModel model)
        {
            var customer = _eBankContext.Customers.FirstOrDefault(c => c.UserId == model.Customer.UserId);
            if (customer != null)
            {
                customer.FirstName = model.Customer.FirstName;
                customer.LastName = model.Customer.LastName;
                customer.DateOfBirth = model.Customer.DateOfBirth;
                customer.LegalStatus = model.Customer.LegalStatus;
                customer.MaritalStatus = model.Customer.MaritalStatus;

                var address = _eBankContext.Address.FirstOrDefault(a => a.CustomerId == customer.CustomerId);
                if (address != null)
                {
                    address.Address1 = model.Address.Address1;
                    address.Address2 = model.Address.Address2;
                    address.City = model.Address.City;
                    address.State = model.Address.State;
                    address.Zip = model.Address.Zip;
                    address.Country = model.Address.Country;
                }
            }
            else
            {
                _eBankContext.Customers.Add(model.Customer);
                _eBankContext.SaveChanges();
                model.Address.CustomerId = model.Customer.CustomerId;
                _eBankContext.Address.Add(model.Address);
            }
            return await _eBankContext.SaveChangesAsync();
        }
    }
}

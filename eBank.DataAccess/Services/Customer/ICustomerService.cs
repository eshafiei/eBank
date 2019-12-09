using System.Threading.Tasks;
using eBank.DataAccess.Models;
using eBank.DataAccess.Models.Address;

namespace eBank.DataAccess.Services.Customer
{
    public interface ICustomerService
    {
        Task<CustomerModel> GetCustomer(string userId);
        Task<AddressModel> GetAddress(long customerId, long addressId);
        Task<int> UpdateCustomer(CustomerModel model);
        Task<int> UpdateAddress(AddressModel model);
    }
}

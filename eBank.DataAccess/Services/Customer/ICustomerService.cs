using System.Threading.Tasks;
using eBank.DataAccess.Models;

namespace eBank.DataAccess.Services.Customer
{
    public interface ICustomerService
    {
        Task<CustomerModel> GetCustomer(long customerId);
        Task<AddressModel> GetAddress(long customerId, long addressId);
        Task<int> UpdateCustomer(CustomerModel model);
        Task<int> UpdateAddress(AddressModel model);
    }
}

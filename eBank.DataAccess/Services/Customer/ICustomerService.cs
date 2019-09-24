using System.Threading.Tasks;
using eBank.DataAccess.ViewModels;

namespace eBank.DataAccess.Services.Customer
{
    public interface ICustomerService
    {
        Task<CustomerViewModel> GetCustomer(string userId);
        Task<int> UpdateCustomer(CustomerViewModel model);
    }
}

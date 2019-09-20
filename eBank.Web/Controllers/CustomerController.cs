using System.Threading.Tasks;
using eBank.DataAccess.Services.Customer;
using eBank.DataAccess.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace eBank.Web.Controllers
{
    [Route("api/[controller]")]
    //[Authorize]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet("[action]/{customerId}")]
        public async Task<CustomerViewModel> GetCustomer(int customerId)
        {
            return await _customerService.GetCustomer(customerId);
        }

        [HttpPost("[action]")]
        public async Task<int> UpdateCustomer(CustomerViewModel model)
        {
            return await _customerService.UpdateCustomer(model);
        }
    }
}
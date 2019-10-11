using System.Threading.Tasks;
using eBank.DataAccess.Models;
using eBank.DataAccess.Services.Customer;
using eBank.DataAccess.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace eBank.Web.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet("{customerId}")]
        public async Task<CustomerModel> Customer(long customerId)
        {
            return await _customerService.GetCustomer(customerId);
        }

        [HttpGet("{customerId}/address/{addressId}")]
        public async Task<AddressModel> CustomerAddress(long customerId, long addressId)
        {
            return await _customerService.GetAddress(customerId, addressId);
        }

        [HttpPut("{customerId}")]
        public async Task<int> Customer(CustomerModel model)
        {
            return await _customerService.UpdateCustomer(model);
        }

        [HttpPut("{customerId}/address/{addressId}")]
        public async Task<int> CustomerAddress(AddressModel model)
        {
            return await _customerService.UpdateAddress(model);
        }
    }
}
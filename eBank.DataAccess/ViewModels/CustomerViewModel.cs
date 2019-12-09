using eBank.DataAccess.Models;
using eBank.DataAccess.Models.Address;

namespace eBank.DataAccess.ViewModels
{
    public class CustomerViewModel
    {
        public CustomerModel Customer { get; set; }
        public AddressModel Address { get; set; }
    }
}

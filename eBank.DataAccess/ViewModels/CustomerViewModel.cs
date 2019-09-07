using eBank.DataAccess.Models;

namespace eBank.DataAccess.ViewModels
{
    public class CustomerViewModel
    {
        public CustomerModel Customer { get; set; }
        public AddressModel Address { get; set; }
    }
}

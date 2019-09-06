using eBank.DataAccess.Models;

namespace eBank.DataAccess.ViewModels
{
    public class AccountViewModel
    {
        public AccountModel Account { get; set; }

        public CustomerModel Customer { get; set; }

        public AddressModel Address { get; set; }
    }
}

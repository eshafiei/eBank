using eBank.DataAccess.Models;
using eBank.DataAccess.Models.Account;

namespace eBank.DataAccess.ViewModels
{
    public class AccountViewModel
    {
        public AccountModel Account { get; set; }

        public CustomerModel Customer { get; set; }
    }
}

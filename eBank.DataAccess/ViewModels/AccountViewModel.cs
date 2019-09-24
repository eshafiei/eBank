using eBank.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace eBank.DataAccess.ViewModels
{
    public class AccountViewModel
    {
        public AccountModel Account { get; set; }

        public CustomerModel Customer { get; set; }
    }
}

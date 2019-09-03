using System;
using eBank.DataAccess.Enums.Account;

namespace eBank.DataAccess.Models
{
    public class CustomerModel
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime DateOfBirth { get; set; }

        public LegalStatus LegalStatus { get; set; }

        public int UserId { get; set; }
    }
}

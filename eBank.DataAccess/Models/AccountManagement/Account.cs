using System.ComponentModel.DataAnnotations;

namespace eBank.DataAccess.Models.AccountManagement
{
    public class Account
    {
        [Key]
        public int? Id { get; set; }
        
        public long AccountNumber { get; set; }

        public int AccountType { get; set; }

        public decimal Balance { get; set; }

        public bool AccountStatus { get; set; }
    }
}
